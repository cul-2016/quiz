var validatePassword = require('../lib/authentication/validatePassword');
var getUser = require('../lib/getUser');
var client = require('../lib/dbClient');

module.exports = {
    method: 'POST',
    path: '/authenticate-user',
    handler: (request, reply) => {
        var email = request.payload.email;
        var password = request.payload.password;

        getUser(client, email, (error, userDetails) => {
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
                            .state('user_id', userDetails[0].user_id.toString(), { path: "/" })
                            .state('cul-email', userDetails[0].email, { path: "/" });
                        //TODO: need to figure out what information should be sent back to save in the state and cookies.
                    }
                });
            }
        });
    }
};
