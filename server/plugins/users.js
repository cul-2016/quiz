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

exports.register = (server, options, next) => {
    const pool = server.app.pool;
    server.route([
        {
            method: 'POST',
            path: '/save-user',
            config: { auth: false },
            handler: (request, reply) => {
                var email = request.payload.email;
                var password = request.payload.password;
                var is_lecturer = request.payload.is_lecturer;
                var username = request.payload.username || '';
                var verification_code = is_lecturer ? uuid() : null;
                var validEmailMessage = { message: 'Please enter a valid email address' };

                const saveUserFlow = () => {
                    hashPassword(password, (error, hashedPassword) => {
                        /* istanbul ignore if */
                        if (error) {
                            return reply(error);
                        }
                        saveUser(pool, email, hashedPassword, is_lecturer, username, verification_code, (error, result) => { // eslint-disable-line no-unused-vars
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
                                    delete userDetails[0].password;
                                    return reply(userDetails[0])
                                        .state('cul_id', userDetails[0].user_id.toString(), { path: "/" })
                                        .state('cul_is_lecturer', userDetails[0].is_lecturer.toString(), { path: "/" })
                                        .state('cul_is_cookie_accepted', 'true', { path: "/" });
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
                            verifyLecturerEmail({
                                email,
                                verificationLink: `${process.env.SERVER_ROUTE}/verification?code=${verification_code}`
                            }, (err) => {
                                /* istanbul ignore if */
                                if (err) {
                                    // no tests as we do not want to get the bounce on Amazon SES
                                    return reply(validEmailMessage);
                                } else {
                                    saveUserFlow();
                                    return reply({ emailSent: true });
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
            config: { auth: false },
            handler: (request, reply) => {
                var verification_code = request.query.code;

                verifyCode(pool, verification_code, (error, isVerified) => {
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
                var user_id = request.query.user_id;
                getUserByID(pool, user_id, (error, userDetails) => {
                    /* istanbul ignore if */
                    if (error) {
                        return reply(error);
                    } else {
                        delete userDetails[0].password;
                        return reply(userDetails[0]);
                    }
                });
            }
        },
        {
            method: 'POST',
            path: '/reset-password-request',
            config: { auth: false },
            handler: (request, reply) => {

                var email = request.payload.email;
                var expiry_code = Date.now() + (24 * 60 * 60 * 1000);
                var resetPasswordLink = uuid();


                // check for a user in the db
                getUserByEmail(pool, email, (error, response) => {
                    /* istanbul ignore if */
                    if (error) {
                        return reply(error);
                    }
                    if (response.length > 0) {
                        saveExpiringTokenForUser(pool, email, resetPasswordLink, expiry_code, (error, user) => {
                            /* istanbul ignore if */
                            if (error) {
                                return reply(error);
                            }

                            resetPasswordRequestEmail({
                                name: user.username,
                                email: user.email,
                                resetPasswordLink: `${process.env.SERVER_ROUTE}/#/reset-password/${resetPasswordLink}`
                            },
                            (error) => {
                                /* istanbul ignore if */
                                if (error) {
                                    reply(error);
                                }
                                return reply(true);
                            }
                        );
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
            config: { auth: false },
            handler: (request, reply) => {
                var code = request.payload.code;
                var password = request.payload.password;

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

