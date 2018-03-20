const uuid = require('uuid/v1');
const saveUser = require('../lib/authentication/saveUser.js');
const verifyLecturerEmail = require('../lib/email/lecturer-verification-email.js');
const verifyCode = require('../lib/verifyCode.js');
const studentWelcomeEmail = require('../lib/email/student-welcome-email.js');
const getUserByEmail = require('../lib/getUserByEmail.js');
const getUserByID = require('../lib/getUserByID.js');
const hashPassword = require('../lib/authentication/hashPassword.js');
const compareResetPasswordCodeAndExpiry = require('../lib/compareResetPasswordCodeAndExpiry.js');
const updatePassword = require('../lib/updatePassword.js');
const resetPasswordRequestEmail = require('../lib/email/reset-password-request-email');
const saveExpiringTokenForUser = require('../lib/saveExpiringTokenForUser');
const validateGroupLecturerByCode = require('../lib/validateGroupLecturerByCode');

const jwt = require('jsonwebtoken');
const Joi = require('joi');

exports.register = (server, options, next) => {
    const { pool, redisCli } = server.app;

    server.route([
        {
            method: 'POST',
            path: '/save-user',
            config: {
                auth: false,
                validate: {
                    payload: {
                        email: Joi.string().email().required(),
                        password: Joi.string().required(),
                        is_lecturer: Joi.boolean().strict().required(),
                        username: Joi.string(),
                        group_code: Joi.string().allow('')
                    }
                }
            },
            handler: (request, reply) => {
                const { email, password, is_lecturer, username = '', group_code = null } = request.payload;
                const verification_code = is_lecturer ? uuid() : null;
                const validEmailMessage = { message: 'Please enter a valid email address' };

                const saveUserFlow = (is_group_admin = false) => {
                    hashPassword(password, (error, hashedPassword) => {
                        /* istanbul ignore if */
                        if (error) {
                            return reply(error);
                        }
                        saveUser(pool, email, hashedPassword, is_lecturer, username, group_code, verification_code, is_group_admin, (error, result) => { // eslint-disable-line no-unused-vars
                            /* istanbul ignore if */
                            if (error) {
                                return reply(error);
                            }
                            else if (!is_lecturer) {
                                getUserByEmail(pool, email, (error, userDetails) => {
                                    /* istanbul ignore if */
                                    if (error) {
                                        return reply(error);
                                    }
                                    else {
                                        delete userDetails[0].password;

                                        const uid = uuid();

                                        const twoWeeks = 60 * 60 * 24 * 14;
                                        redisCli.setAsync(userDetails[0].user_id.toString(), uid, 'EX', twoWeeks)
                                            .then(() => {
                                                const userObject = { user_details: userDetails[0], uid: uid };
                                                const token = jwt.sign(userObject, process.env.JWT_SECRET);
                                                const options = { path: "/", isSecure: false, isHttpOnly: false };
                                                reply(userDetails[0])
                                                    .header("Authorization", token)
                                                    .state('token', token, options)
                                                    .state('cul_is_cookie_accepted', 'true', options);
                                            })
                                            .catch((err) => reply(err));
                                    }
                                });
                            }
                        });
                    });
                };

                getUserByEmail(pool, email, (error, userExists) => {
                    /* istanbul ignore if */
                    if (error) {
                        return reply(error);
                    }
                    if (userExists.length === 1) {
                        return reply({ message: 'user exists' });
                    } else {
                        if (is_lecturer) {

                            validateGroupLecturerByCode(pool, group_code, (error, groupAccountInfo) => {
                                /* istanbul ignore if */
                                if (error) {
                                    return reply(error);
                                }
                                else if (group_code && groupAccountInfo.length === 0) {
                                    return reply({ message: 'The code you have entered is invalid' });
                                }
                                else if (group_code && groupAccountInfo[0].users_with_code === groupAccountInfo[0].user_limit) {
                                    return reply({ message: 'Your institution has reached the maximum number of accounts. Please contact your adminstrator' });
                                }
                                else {
                                    verifyLecturerEmail({
                                        email,
                                        verificationLink: `${process.env.SERVER_ROUTE}/verification?code=${verification_code}`
                                    }, (err) => {
                                        /* istanbul ignore if */
                                        if (err) {
                                            // no tests as we do not want to get the bounce on Amazon SES
                                            return reply(validEmailMessage);
                                        } else {
                                            console.log(groupAccountInfo[0], '<<< groupacctouninfo');

                                            const is_group_admin = groupAccountInfo[0] && groupAccountInfo[0].admin_email === email ? true : false;

                                            saveUserFlow(is_group_admin);
                                            return reply({ emailSent: true });
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            studentWelcomeEmail({
                                username,
                                email
                            }, (err) => {
                                /* istanbul ignore if */
                                if (err) {
                                    return reply(validEmailMessage);
                                } else {
                                    saveUserFlow();
                                }
                            });
                        }
                    }
                });
            }
        },
        {
            method: 'GET',
            path: '/verification',
            config: {
                auth: false,
                validate: {
                    query: {
                        code: Joi.string().required()
                    }
                }
            },
            handler: (request, reply) => {
                const { code } = request.query;

                verifyCode(pool, code, (error, isVerified) => {
                    /* istanbul ignore if */
                    if (error) {
                        console.error(error);
                        return reply(error);
                    }
                    if (isVerified) {
                        return reply.redirect('/#/verification/true');
                    } else {
                        return reply.redirect('/#/verification/false');
                    }
                });

            }
        },
        {
            method: 'GET',
            path: '/get-user-details',
            handler: (request, reply) => {
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                    const { user_id } = decoded.user_details;
                    getUserByID(pool, user_id, (error, userDetails) => {
                        /* istanbul ignore if */
                        if (error) {
                            return reply(error);
                        } else {
                            delete userDetails[0].password;
                            return reply(userDetails[0]);
                        }
                    });
                });
            }
        },
        {
            method: 'POST',
            path: '/reset-password-request',
            config: {
                auth: false,
                validate: {
                    payload: {
                        email: Joi.string().email()
                    }
                }
            },
            handler: (request, reply) => {
                const { email } = request.payload;
                const expiry_code = Date.now() + (24 * 60 * 60 * 1000);
                const resetPasswordLink = uuid();

                // check for a user in the db
                getUserByEmail(pool, email, (error, response) => {
                    /* istanbul ignore if */
                    if (error) {
                        return reply(error);
                    }
                    if (response.length > 0) {
                        saveExpiringTokenForUser(pool, email, resetPasswordLink, expiry_code, (error, { name, email }) => {
                            /* istanbul ignore if */
                            if (error) {
                                return reply(error);
                            }

                            resetPasswordRequestEmail({
                                name,
                                email,
                                resetPasswordLink: `${process.env.SERVER_ROUTE}/#/reset-password/${resetPasswordLink}`
                            },
                            (error) => {
                                /* istanbul ignore if */
                                if (error) {
                                    reply(error);
                                }
                                return reply(true);
                            });
                        });
                    }
                    else {
                        return reply({ message: 'Sorry the email does not exist' });
                    }
                });
            }
        },
        {
            method: 'POST',
            path: '/submit-new-password',
            config: {
                auth: false,
                validate: {
                    payload: {
                        code: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: (request, reply) => {
                const { code, password } = request.payload;

                compareResetPasswordCodeAndExpiry(pool, code, (error, result) => {
                    /* istanbul ignore if */
                    if (error) {
                        return reply(error);
                    }
                    if (result.message) {
                        return reply(result);
                    }
                    else if (result === true) {
                        hashPassword(password, (error, hashedPassword) => {
                            /* istanbul ignore if */
                            if (error) {
                                return reply(error);
                            }
                            updatePassword(pool, code, hashedPassword, (error, response) => {
                                /* istanbul ignore if */
                                if (error) {
                                    return reply(error);
                                }
                                else if (response) {
                                    return reply(true);
                                }
                            });
                        });
                    }
                });

            }
        }
    ]);

    next();
};

exports.register.attributes = { pkg: { name: 'users' } };
