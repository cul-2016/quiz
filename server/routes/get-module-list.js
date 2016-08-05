var getModuleList = require('../lib/getModuleList');
var client = require('../lib/dbClient');

module.exports = {
    method: 'GET',
    path: '/get-module-list',
    handler: (request, reply) => {
        var user_id = request.query.user_id;
        var is_lecturer = request.query.is_lecturer;
        console.log("IS YOU A LECTURER", is_lecturer);
        if (is_lecturer !== undefined) {

            is_lecturer = is_lecturer.toLowerCase() === "true";
            getModuleList(client, user_id, is_lecturer, (error, modules) => {
                var verdict = error || modules;
                reply(verdict);
            });
        } else {
            console.log("we have an error");
            reply(new Error('is_lecturer is not defined'));
        }
    }
};
