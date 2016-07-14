var getModules = require('../lib/get-modules');
var client = require('../lib/db-client');

module.exports = {
    method: 'GET',
    path: '/get-modules',
    handler: (request, reply) => {

        getModules(client, request.query.user_id, (error, modules) => {
            
            var verdict = error || modules;
            reply(verdict);
        });
    }
};
