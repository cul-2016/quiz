var client = require('../lib/dbClient.js');
var getStudentHistory = require('../lib/getStudentHistory.js');


module.exports = {
    method: 'GET',
    path: '/get-student-history',
    handler: (request, reply) => {

        var user_id = request.query.user_id;
        var module_id = request.query.module_id;

        if (!module_id || !user_id) {
            return reply(new Error('module_id and user_id must be defined'));
        }

        getStudentHistory(client, user_id, module_id, (error, history) => {
            var verdict = error || history;
            reply(verdict);
        });
    }
};
