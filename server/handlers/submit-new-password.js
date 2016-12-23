var client = require('../lib/dbClient');
var hashPassword = require('../lib/authentication/hashPassword');
var compareResetPasswordCodeAndExpiry = require('../lib/compareResetPasswordCodeAndExpiry');
var updatePassword = require('../lib/updatePassword');

module.exports = {
    method: 'POST',
    path: '/submit-new-password',
    handler: (request, reply) => {
        var code = request.payload.code;
        var password = request.payload.password;

        compareResetPasswordCodeAndExpiry(client, code, (error, result) => {
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
                    updatePassword(client, code, hashedPassword, (error, response) => {
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
};
