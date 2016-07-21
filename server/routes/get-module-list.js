var getModuleList = require('../lib/getModuleList');
var client = require('../lib/dbClient');

module.exports = {
    method: 'GET',
    path: '/get-module-list',
    handler: (request, reply) => {

        getModuleList(client, request.query.user_id, (error, modules) => {

            var verdict = error || modules;
            reply(verdict);
        });
    }
};
