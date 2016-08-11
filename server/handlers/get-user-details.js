var getUserByID = require('../lib/getUserByID');
var client = require('../lib/dbClient');

module.exports = {
    method: 'GET',
    path: '/get-user-details',
    handler: (request, reply) => {
        var user_id = request.query.user_id;
        getUserByID(client, user_id, (error, userDetails) => {
            if (error) {
                return reply(error);
            } else {
                delete userDetails[0].password;
                return reply(userDetails[0]);
            }
        });
    }
};
