const validatePassword = require('../lib/authentication/validatePassword');
const getUserByEmail = require('../lib/getUserByEmail');
const client = require('../lib/dbClient');
const uuid = require('uuid/v1');
const JWT = require('jsonwebtoken');

exports.register = (server, options, next) => {
    server.route({
        method: 'POST',
        path: '/authenticate-user',
        config: {
            auth: false
        },
        handler: (request, reply) => {
            const email = request.payload.email;
            const password = request.payload.password;

            getUserByEmail(client, email, (error, userDetails) => {
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
                                    const token = JWT.sign(userObject, 'secret');

                                    reply(userDetails[0])
                                        .header("Authorization", token)
                                        .state('cul_id', userDetails[0].user_id.toString(), { path: "/" })
                                        .state('token', token, { path: "/" })
                                        .state('cul_is_lecturer', userDetails[0].is_lecturer.toString(), { path: "/" })
                                        .state('cul_is_cookie_accepted', 'true', { path: "/" });
                                })
                                .catch((err) => reply(err));
                        }
                    });
                }
            });
        }
    });
    next();
}

exports.register.attributes = { pkg: { name: 'auth' } };
