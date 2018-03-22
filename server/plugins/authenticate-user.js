const validatePassword = require('../lib/authentication/validatePassword');
const getUserByEmail = require('../lib/getUserByEmail');
const uuid = require('uuid/v1');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

exports.register = (server, options, next) => {
    const pool = server.app.pool;

    server.route([
        {
            method: 'POST',
            path: '/authenticate-user',
            config: {
                auth: false,
                validate: {
                    payload: {
                        email: Joi.string().email().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: (request, reply) => {
                const email = request.payload.email;
                const password = request.payload.password;
                getUserByEmail(pool, email, (error, userDetails) => {

                    /* istanbul ignore if */
                    if (error) {
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
                    }
                    else {
                        const hashedPassword = userDetails[0].password;
                        validatePassword(password, hashedPassword, (error, response) => {
                            /* istanbul ignore if */
                            if (error) {
                                return reply(error);
                            }
                            else if (!response) {
                                return reply({ message: "Please enter a valid email or password" });
                            }
                            else if (!userDetails[0].is_verified) {
                                return reply({ message: "User is not verified" });
                            }
                            else {
                                delete userDetails[0].password;

                                const uid = uuid();
                                const client = server.app.redisCli;

                                const twoWeeks = 60 * 60 * 24 * 14;
                                client.setAsync(userDetails[0].user_id.toString(), uid, 'EX', twoWeeks)
                                    .then(() => {
                                        const userObject = { user_details: userDetails[0], uid: uid, scope: [userDetails[0].is_super_admin ? "super-admin" : "", userDetails[0].is_group_admin ? "group-admin" : ""] };
                                        const token = jwt.sign(userObject, process.env.JWT_SECRET);
                                        const options = { path: "/", isSecure: false, isHttpOnly: false };
                                        return reply(userDetails[0])
                                            .header("Authorization", token)
                                            .state('token', token, options)
                                            .state('cul_is_cookie_accepted', 'true', options);
                                    })
                                    .catch((err) => reply(err));
                            }
                        });
                    }
                });
            }
        },
        {
            method: 'POST',
            path: '/logout',
            config: {
                auth: {
                    mode: 'try'
                },
            },
            handler: (request, reply) => {
                if (request.auth.credentials) {
                    jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                        if (error) { return reply(error); }
                        const client = server.app.redisCli;

                        client.delAsync(decoded.user_details.user_id)
                        .then( () => reply("user deleted"))
                        .catch( () => reply("error deleting user from redis"));
                    });
                } else {
                    reply("user deleted").unstate('token');
                }
            }
        }
    ]);

    next();
};

exports.register.attributes = { pkg: { name: 'auth' } };
