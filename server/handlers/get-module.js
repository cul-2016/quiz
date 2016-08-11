var getModule = require('../lib/getModule');
var client = require('../lib/dbClient');

module.exports = {
    method: 'GET',
    path: '/get-module',
    handler: (request, reply) => {

        getModule(client, request.query.module_id, (error, module) => {

            var verdict = error || module;
            reply(verdict);
        });
    }
};
