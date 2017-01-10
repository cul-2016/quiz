const validatePassword = require('../lib/authentication/validatePassword');
const getUserByEmail = require('../lib/getUserByEmail');
const uuid = require('uuid/v1');
const JWT = require('jsonwebtoken');

exports.register = (server, options, next) => {
    const pool = server.app.pool;

    server.route({
        method: 'POST',
        path: '/authenticate-user',
        config: { auth: false },
        handler: (request, reply) => {
            const email = request.payload.email;
            const password = request.payload.password;
            getUserByEmail(pool, email, (error, userDetails) => {
                /* istanbul ignore if */
                if (error) {
                    reply(error);
                } else if (userDetails.length !== 1) {
                    reply({ message: "sorry, this user does not exist" });
                } else {
                    const hashedPassword = userDetails[0].password;
                    validatePassword(password, hashedPassword, (error, response) => {
                        /* istanbul ignore if */
                        if (error) {
                            reply(error);
                        }
                        else if (!response) {
                            reply({ message: "please enter a valid email or password" });
                        }
                        else if (!userDetails[0].is_verified) {
                            reply({ message: "user is not verified" });
                        }
                        else {
                            delete userDetails[0].password;

                            const uid = uuid();
                            const client = server.app.redisCli;

                            client.setAsync(userDetails[0].user_id.toString(), uid)
                                .then(() => {
                                    const userObject = { user_details: userDetails[0], uid: uid };
                                    const token = JWT.sign(userObject, process.env.JWT_SECRET);
                                    const options = { path: "/", isSecure: false, isHttpOnly: false };
                                    reply(userDetails[0])
                                        .header("Authorization", token)
                                        .state('cul_id', userDetails[0].user_id.toString(), options)
                                        .state('token', token, options)
                                        .state('cul_is_lecturer', userDetails[0].is_lecturer.toString(), options)
                                        .state('cul_is_cookie_accepted', 'true', options);
                                })
                                .catch((err) => reply(err));
                        }
                    });
                }
            });
        }
    });
    next();
};

exports.register.attributes = { pkg: { name: 'auth' } };
