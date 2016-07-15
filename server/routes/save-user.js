var saveUser = require('../lib/authentication/saveUser');
var client = require('../lib/dbClient');
var hashPassword = require('../lib/authentication/hashPassword');

module.exports = {
    method: 'POST',
    path: '/save-user',
    handler: (request, reply) => {
        var email = request.payload.email;
        var password = request.payload.email;
        var is_lecturer = request.payload.is_lecturer;
        var username = request.payload.username || '';

        hashPassword(password, (error, hashedPassword) => {
            if (error) {
                console.log(error, 'from hashPassword');
                reply(error);
            }
            saveUser(client, email, hashedPassword, is_lecturer, username, (error, result) => {
                console.log(error, 'error from save user');
                var verdict = error || result;

                reply(verdict);
                //TODO: need to figure out what information should be sent back to save in the state and cookies.
            });
        });
    }
};
