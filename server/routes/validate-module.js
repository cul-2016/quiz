var validateModuleID = require('../lib/validateModuleID');
var client = require('../lib/dbClient');

module.exports = {
    method: 'GET',
    path: '/validate-module',
    handler: (request, reply) => {
        var module_id = request.query.module_id;
        validateModuleID(client, module_id, (error, modules) => {

            var verdict = error || modules;
            reply(verdict);
        });
    }
};
