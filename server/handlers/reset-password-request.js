var UUID = require('uuid/v1');
var resetPasswordRequestEmail = require('../lib/email/reset-password-request-email');
var saveExpiringTokenForUser = require('../lib/saveExpiringTokenForUser');
var client = require('../lib/dbClient');


module.exports = {
    method: 'POST',
    path: '/reset-password-request',
    handler: (request, reply) => {

        var email = request.payload.email;
        var expiry_code = Date.now() + (24 * 60 * 60 * 1000);
        var resetPasswordLink = UUID();

        saveExpiringTokenForUser(client, email, resetPasswordLink, expiry_code, (error, user) => {
            /* istanbul ignore if */
            if (error) {
                return reply(error);
            }
            resetPasswordRequestEmail({
                name: user.username,
                email: user.email,
                resetPasswordLink: `http://localhost:9000/#/reset-password/${resetPasswordLink}`
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
};
