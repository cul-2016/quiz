var saveModule = require('../lib/saveModule');
var client = require('../lib/dbClient');

module.exports = {
    method: 'POST',
    path: '/add-new-module',
    handler: (request, reply) => {

        var user_id = request.query.user_id;
        var data = request.payload;
        
        saveModule(client, data.module_id, user_id, data.name, data.medals, data.trophies, (error, result) => {

            var verdict = error || result;
            reply(verdict);
        });
    }
};
