var client = require('../lib/dbClient');
// var hashPassword = require('../lib/authentication/hashPassword');
var compareResetPasswordCodeAndExpiry = require('../lib/compareResetPasswordCodeAndExpiry');

module.exports = {
    method: 'POST',
    path: '/save-user',
    handler: (request, reply) => {
        var code = request.payload.code;
        var password = request.payload.password;

        // compare codes & expiry | if ok => update password
        // compaers returns true or false
        compareResetPasswordCodeAndExpiry(client, code, password, (error, result) => {
            /* istanbul ignore if */
            if (error) {
                return reply(error);
            }
            if (result.message) {
                return reply(result.message);
            }
            else if (result === true) {


                // hash password and update password in db.
                // then reply
            }

        });

    }
};
