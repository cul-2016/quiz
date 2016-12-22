var uuid = require('uuid/v1');
var saveUser = require('../lib/authentication/saveUser');
var verifyLecturerEmail = require('../lib/email/lecturer-verification-email');
var studentWelcomeEmail = require('../lib/email/student-welcome-email');
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
            /* istanbul ignore if */
            if (error) {
                return reply(error);
            }
            if (userExists.length === 1) {
                return reply(true);
            } else {
                if (is_lecturer) {
                    verifyLecturerEmail({
                        name: 'lecturer',
                        email,
                        verificationLink: `http://localhost:9000/verification?code=${verification_code}`
                    }, (err) => {
                        /* istanbul ignore if */
                        if (err) {
                            return reply(err);
                        }
                        reply({ emailSent: true });
                    });
                }
                if (!is_lecturer) {
                    studentWelcomeEmail({
                        name: username,
                        email
                    }, (err) => {
                        /* istanbul ignore if */
                        if (err) {
                            return reply(error);
                        }
                    });
                }
                hashPassword(password, (error, hashedPassword) => {
                    /* istanbul ignore if */
                    if (error) {
                        return reply(error);
                    }
                    saveUser(client, email, hashedPassword, is_lecturer, username, verification_code, (error, result) => { // eslint-disable-line no-unused-vars
                        /* istanbul ignore if */
                        if (error) {
                            return reply(error);
                        }
                        else if (!is_lecturer) {
                            getUserByEmail(client, email, (error, userDetails) => {
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
            }
        });
    }
};
