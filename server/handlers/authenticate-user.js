var validatePassword = require('../lib/authentication/validatePassword');
var getUserByEmail = require('../lib/getUserByEmail');
var client = require('../lib/dbClient');

module.exports = {
    method: 'POST',
    path: '/authenticate-user',
    handler: (request, reply) => {
        var email = request.payload.email;
        var password = request.payload.password;

        getUserByEmail(client, email, (error, userDetails) => {
            if (error) {
                reply(error);
            } else if (userDetails.length !== 1) {
                reply(false);
            } else {
                var hashedPassword = userDetails[0].password;
                validatePassword(password, hashedPassword, (error, response) => {
                    if (error) {
                        reply(error);
                    }
                    else if (!response) {
                        reply(false);
                    }
                    else {
                        delete userDetails[0].password;
                        reply(userDetails[0])
                            .state('cul_id', userDetails[0].user_id.toString(), { path: "/" })
                            .state('cul_is_lecturer', userDetails[0].is_lecturer.toString(), { path: "/" })
                            .state('cul_is_cookie_accepted', 'true', { path: "/" });
                    }
                });
            }
        });
    }
};
