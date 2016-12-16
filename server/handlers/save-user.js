var uuid = require('uuid/v1');
var saveUser = require('../lib/authentication/saveUser');
var sendEmail = require('../lib/email/lecturer-verification-email.js');
var client = require('../lib/dbClient');
var getUserByEmail = require('../lib/getUserByEmail');

var hashPassword = require('../lib/authentication/hashPassword');

module.exports = {
    method: 'POST',
    path: '/save-user',
    handler: (request, reply) => {
        var email = request.payload.email;
        var password = request.payload.password;
        var is_lecturer = request.payload.is_lecturer;
        var username = request.payload.username || '';
        var verification_code = is_lecturer ? uuid() : null;

        getUserByEmail(client, email, (error, userExists) => {
            if (userExists.length === 1) {
                return reply(true);
            } else {
                hashPassword(password, (error, hashedPassword) => {
                    if (error) {
                        return reply(error);
                    }
                    saveUser(client, email, hashedPassword, is_lecturer, username, verification_code, (error, result) => { // eslint-disable-line no-unused-vars
                        if (error) {
                            return reply(error);
                        }
                        if (is_lecturer) {
                            sendEmail({
                                name: 'lecturer',
                                email,
                                verificationLink: `http://localhost:9000/verification?code=${verification_code}`
                            }, (err) => err ? reply(err) : reply({ emailSent: true }));
                        }
                        getUserByEmail(client, email, (error, userDetails) => {
                            delete userDetails[0].password;
                            return reply(userDetails[0])
                            .state('cul_id', userDetails[0].user_id.toString(), { path: "/" })
                            .state('cul_is_lecturer', userDetails[0].is_lecturer.toString(), { path: "/" })
                            .state('cul_is_cookie_accepted', 'true', { path: "/" });
                        });
                    });
                });
            }
        });
    }
};
