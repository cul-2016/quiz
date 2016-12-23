var UUID = require('uuid/v1');
var resetPasswordRequestEmail = require('../lib/email/reset-password-request-email');
var saveExpiringTokenForUser = require('../lib/saveExpiringTokenForUser');
var client = require('../lib/dbClient');
var getUserByEmail = require('../lib/getUserByEmail');

module.exports = {
    method: 'POST',
    path: '/reset-password-request',
    handler: (request, reply) => {

        var email = request.payload.email;
        var expiry_code = Date.now() + (24 * 60 * 60 * 1000);
        var resetPasswordLink = UUID();


        // check for a user in the db
        getUserByEmail(client, email, (error, response) => {
            /* istanbul ignore if */
            if (error) {
                return reply(error);
            }
            if (response.length > 0) {
                saveExpiringTokenForUser(client, email, resetPasswordLink, expiry_code, (error, user) => {
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
};
