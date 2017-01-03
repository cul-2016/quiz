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
        var validEmailMessage = { message: 'Please enter a valid email address' };

        const saveUserFlow = () => {
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
        };

        getUserByEmail(client, email, (error, userExists) => {
            /* istanbul ignore if */
            if (error) {
                return reply(error);
            }
            if (userExists.length === 1) {
                return reply({ message: 'user exists' });
            } else {
                if (is_lecturer) {
                    verifyLecturerEmail({
                        name: 'lecturer',
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
};
