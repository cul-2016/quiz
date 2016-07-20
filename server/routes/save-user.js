var saveUser = require('../lib/authentication/saveUser');
var client = require('../lib/dbClient');
var getUser = require('../lib/getUser');

var hashPassword = require('../lib/authentication/hashPassword');

module.exports = {
    method: 'POST',
    path: '/save-user',
    handler: (request, reply) => {
        var email = request.payload.email;
        var password = request.payload.email;
        var is_lecturer = request.payload.is_lecturer;
        var username = request.payload.username || '';

        getUser(client, email, (error, userExists) => {
            if (userExists.length === 1) {
                return reply(true);
            } else {
                hashPassword(password, (error, hashedPassword) => {
                    if (error) {
                        return reply(error);
                    }
                    saveUser(client, email, hashedPassword, is_lecturer, username, (error, result) => {
                        if (error) {
                            return reply(error);
                        }
                        getUser(client, email, (error, userDetails) => {
                            delete userDetails[0].password;
                            return reply(userDetails[0])
                            .state('cul_id', userDetails[0].user_id.toString(), { path: "/" });
                            //TODO: need to figure out what information should be sent back to save in the state and cookies.
                        });
                    });
                });
            }
        });
    }
};
