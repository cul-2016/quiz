var getModuleMembers = require('../lib/getModuleMembers');
var client = require('../lib/dbClient');

module.exports = {
    method: 'GET',
    path: '/get-module-members',
    handler: (request, reply) => {
        var module_id = request.query.module_id;
        if (module_id !== undefined) {

            getModuleMembers(client, module_id, (error, users) => {
                var verdict = error || users;
                reply(verdict);
            });
        } else {
            reply(new Error('module_id is not defined'));
        }
    }
};
