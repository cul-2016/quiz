var removeModuleMember = require('../lib/removeModuleMember');
var client = require('../lib/dbClient');

module.exports = {
    method: 'GET',
    path: '/remove-module-member',
    handler: (request, reply) => {
        var module_id = request.query.module_id;
        var user_id = request.query.user_id;
        if (module_id !== undefined && user_id !== undefined) {

            user_id = parseInt(user_id);
            removeModuleMember(client, module_id, user_id, (error, modules) => {
                var verdict = error || modules;
                reply(verdict);
            });
        } else {
            reply(new Error('module_id or user_id is not defined'));
        }
    }
};
