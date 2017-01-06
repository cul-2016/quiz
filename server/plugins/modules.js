const getModuleList = require('../lib/getModuleList.js');
const getModuleForLecturer = require('../lib/getModuleForLecturer.js');
const getModuleForStudent = require('../lib/getModuleForStudent.js');
const validateModuleID = require('../lib/validateModuleID.js');
const saveModule = require('../lib/saveModule.js');
const getModuleMembers = require('../lib/getModuleMembers.js');
const removeModuleMember = require('../lib/removeModuleMember.js');
const joinModule = require('../lib/joinModule.js');

exports.register = (server, options, next) => {
    const pool = server.app.pool;
    server.route([
        {
            method: 'GET',
            path: '/get-module-list',
            handler: (request, reply) => {
                var user_id = request.query.user_id;
                var is_lecturer = request.query.is_lecturer;
                if (is_lecturer !== undefined) {

                    is_lecturer = is_lecturer.toLowerCase() === "true";
                    getModuleList(pool, user_id, is_lecturer, (error, modules) => {
                        var verdict = error || modules;
                        reply(verdict);
                    });
                } else {
                    reply(new Error('is_lecturer is not defined'));
                }
            }
        },
        {
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

                    getModuleForLecturer(pool, request.query.module_id, (error, module) => {

                        var verdict = error || module;
                        reply(verdict);
                    });
                } else {

                    getModuleForStudent(pool, user_id, module_id, (error, module) => {

                        var verdict = error || module;
                        reply(verdict);
                    });
                }
            }
        },
        {
            method: 'GET',
            path: '/validate-module',
            handler: (request, reply) => {
                var module_id = request.query.module_id;
                validateModuleID(pool, module_id, (error, exists) => {

                    var verdict = error || exists;
                    reply(verdict);
                });
            }
        },
        {
            method: 'POST',
            path: '/add-new-module',
            handler: (request, reply) => {

                var user_id = request.query.user_id;
                var data = request.payload;
                
                saveModule(pool, data.module_id, user_id, data.name, data.medals, data.trophies, (error, result) => {

                    var verdict = error || result;
                    reply(verdict);
                });
            }
        },
        {
            method: 'get',
            path: '/join-module',
            handler: (request, reply) => {

                var module_id = request.query.module_id;
                var user_id = request.query.user_id;
                if (module_id !== undefined && user_id !== undefined) {

                    user_id = parseInt(user_id);
                    joinModule(pool, module_id, user_id, (error, result) => {

                        var verdict = error || result;
                        reply(verdict);
                    });
                } else {
                    reply(new Error('module_id or user_id is not defined'));
                }
            }
        },
        {
            method: 'GET',
            path: '/get-module-members',
            handler: (request, reply) => {
                var module_id = request.query.module_id;
                if (module_id !== undefined) {

                    getModuleMembers(pool, module_id, (error, users) => {
                        var verdict = error || users;
                        reply(verdict);
                    });
                } else {
                    reply(new Error('module_id is not defined'));
                }
            }
        },
        {
            method: 'GET',
            path: '/remove-module-member',
            handler: (request, reply) => {
                var module_id = request.query.module_id;
                var user_id = request.query.user_id;
                if (module_id !== undefined && user_id !== undefined) {

                    user_id = parseInt(user_id);
                    removeModuleMember(pool, module_id, user_id, (error, modules) => {
                        var verdict = error || modules;
                        reply(verdict);
                    });
                } else {
                    reply(new Error('module_id or user_id is not defined'));
                }
            }
        }
    ]);

    next();
}

exports.register.attributes = { pkg: { name: 'modules' } };

