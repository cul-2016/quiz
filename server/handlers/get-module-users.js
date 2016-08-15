var getModuleUsers = require('../lib/getModuleUsers');
var client = require('../lib/dbClient');

module.exports = {
    method: 'GET',
    path: '/get-module-users',
    handler: (request, reply) => {
        var module_id = request.query.module_id;
        if (module_id !== undefined) {

            getModuleUsers(client, module_id, (error, modules) => {
                var verdict = error || modules;
                reply(verdict);
            });
        } else {
            reply(new Error('module_id is not defined'));
        }
    }
};
