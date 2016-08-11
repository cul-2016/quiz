var joinModule = require('../lib/joinModule');
var client = require('../lib/dbClient');

module.exports = {
    method: 'get',
    path: '/join-module',
    handler: (request, reply) => {

        var module_id = request.query.module_id;
        var user_id = request.query.user_id;
        if (module_id !== undefined && user_id !== undefined) {

            user_id = parseInt(user_id);
            joinModule(client, module_id, user_id, (error, result) => {

                var verdict = error || result;
                reply(verdict);
            });
        } else {
            reply(new Error('module_id or user_id is not defined'));
        }
    }
};
