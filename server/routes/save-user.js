var saveUsers = require('../lib/authentication/saveUser');
var client = require('../lib/dbClient');

module.exports = {
    method: 'POST',
    path: '/save-user',
    handler: (request, reply) => {
        var email = request.payload.email;
        var password = request.payload.email;
        var is_lecturer = request.payload.is_lecturer;
        var username = request.payload.username;



    }
};
