var client = require('../lib/dbClient');
var getModuleForLecturer = require('../lib/getModuleForLecturer');
var getModuleForStudent = require('../lib/getModuleForStudent');


module.exports = {
    method: 'GET',
    path: '/get-module',
    handler: (request, reply) => {

        let module_id = request.query.module_id,
            is_lecturer = request.query.is_lecturer,
            user_id = request.query.user_id;

        if (is_lecturer === undefined) {
            const error = new Error("`is_lecturer` must be defined");
            console.error(error);
            return reply(error);
        }

        if (is_lecturer === 'true') {

            getModuleForLecturer(client, request.query.module_id, (error, module) => {

                var verdict = error || module;
                reply(verdict);
            });
        } else {

            getModuleForStudent(client, module_id, user_id, (error, module) => {

                var verdict = error || module;
                reply(verdict);
            });
        }
    }
};
