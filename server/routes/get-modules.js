var getModules = require('../lib/getModules');
var client = require('../lib/dbClient');

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
