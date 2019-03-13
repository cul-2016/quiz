const uuid = require('uuid/v1');
const verifyCode = require('../lib/verifyCode.js');
const getUserByEmail = require('../lib/getUserByEmail.js');
const getUserByID = require('../lib/getUserByID.js');
const mergeUsers = require('../lib/mergeUsers.js');
const hashPassword = require('../lib/authentication/hashPassword.js');
const compareResetPasswordCodeAndExpiry = require('../lib/compareResetPasswordCodeAndExpiry.js');
const updatePassword = require('../lib/updatePassword.js');
const resetPasswordRequestEmail = require('../lib/email/reset-password-request-email');
const saveExpiringTokenForUser = require('../lib/saveExpiringTokenForUser');
const getUserByMoodleID = require('../lib/getUserByMoodleID');
const setSession = require('../lib/authentication/setSession');
const validatePassword = require('../lib/authentication/validatePassword');
const updateMoodleGrade = require('../lib/updateMoodleGrade.js');
const saveStudent = require('./handlers/save-student.js');
const saveLecturer = require('./handlers/save-lecturer.js');


const jwt = require('jsonwebtoken');
const Joi = require('joi');

exports.register = (server, options, next) => {
    const { pool, redisCli } = server.app;

    server.route([
        {
            method: 'POST',
            path: '/save-user',
            config: {
              auth: {
                  mode: 'try'
              },
              validate: {
                  payload: {
                      email: Joi.string().email().required(),
                      password: Joi.string().allow(''),
                      is_lecturer: Joi.boolean().strict().required(),
                      username: Joi.string().allow(''),
                      group_code: Joi.string().allow('')
                  }
              }
            },
            handler: (request, reply) => {
              return request.payload.is_lecturer ? saveLecturer(request, reply, server, pool, redisCli) : saveStudent(request, reply, server, pool, redisCli);
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
                    if (error) return reply(error);
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
        },
        {
          method: 'POST',
          path: '/migrate-user',
          config: {
            auth: {
                mode: 'try'
            },
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().required(),
                    moduleId: Joi.string()
                }
            },
            handler: (request, reply) => {
              const email = request.payload.email;
              const password = request.payload.password;
              const moduleId = request.payload.moduleId;
              getUserByEmail(pool, email, (error, userDetails) => {
                /* istanbul ignore if */
                if (error) {
                    console.log(error);
                    return reply(error);
                }
                else if (userDetails.length !== 1) {
                    return reply({ message: "Sorry, this user does not exist" });
                }
                else if (!userDetails[0].is_user_active) {
                    // user has been deactivated by group admin
                    return reply({ message: "Sorry, your account has been deactivated, please contact your administrator to restore access" });
                }
                else if (userDetails[0].paid === false) {
                    // when individual lecturer has not paid
                    return reply({ message: "Your subscription has expired. Please email hello@quodl.co.uk to renew." });
                }
                else if (!userDetails[0].paid && userDetails[0].trial_expiry_time && userDetails[0].trial_expiry_time < Date.now()) {
                    // when indivudual lecturers trial has expired and they haven't paid
                    return reply({ message: "Sorry, your trial has expired, please contact Quodl to upgrade your free account" });
                }
                else if (userDetails[0].group_admin_has_paid === false) {
                    // check if group_admin has paid, show message if they havent.
                    return reply({ message: "Your institution's subscription has expired. To continue using Quodl, please contact your administrator, or email hello@quodl.co.uk" });
                } else {
                    const hashedPassword = userDetails[0].password;
                    validatePassword(password, hashedPassword, (error, response) => {
                      /* istanbul ignore if */
                      if (error) {
                        console.log(error);
                        return reply(error);
                      } else if (!response) {
                        return reply({ message: "Please enter a valid email or password" });
                      } else if (!userDetails[0].is_verified) {
                        return reply({ message: "User is not verified" });
                      } else {
                        delete userDetails[0].password;

                        jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                          if (decoded && decoded.user_details && decoded.user_details.moodle_id) {
                            return mergeUsers(pool, userDetails[0].email, decoded.user_details.user_id, decoded.user_details.moodle_id, function(err, res) {
                              if (err) console.log(err);
                              return getUserByMoodleID(pool, decoded.user_details.moodle_id, function(err, userDetails) {
                                if (err) console.log(err);
                                return setSession(server, userDetails[0], (err, token, options) => {
                                  if (err) console.log(err);
                                  if (decoded.user_details.lti_payload) {
                                    return updateMoodleGrade(pool, decoded.user_details.user_id, moduleId, decoded.user_details.lti_payload, (err, res) => {
                                      return reply(userDetails[0])
                                        .header("Authorization", token)
                                        .state('token', token, options)
                                        .state('cul_is_cookie_accepted', 'true', options);
                                    });
                                  } else {
                                    return reply(userDetails[0])
                                      .header("Authorization", token)
                                      .state('token', token, options)
                                      .state('cul_is_cookie_accepted', 'true', options);
                                  }
                                });
                              });
                            });
                          }
                          return reply().code(500);
                        });
                      }
                    });
                  }
                });
            }
        }
      }
    ]);

    next();
};

exports.register.attributes = { pkg: { name: 'users' } };
