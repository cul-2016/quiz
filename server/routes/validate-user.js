var validatePassword = require('../lib/authentication/validatePassword');
var getUser = require('../lib/getUser');
var client = require('../lib/dbClient');

module.exports = {
    method: 'POST',
    path: '/validate-user',
    handler: (request, reply) => {
        var email = request.payload.email;
        var password = request.payload.password;

        getUser(client, email, (error, userDetails) => {
            if (error) {
                reply(error);
            }
            var hashedPassword = userDetails[0].password;
            validatePassword(password, hashedPassword, (error, response) => {
                if (error) {
                    reply(error);
                }

                reply(response);
                    //TODO: need to figure out what information should be sent back to save in the state and cookies.
            });
        });


    }
};
