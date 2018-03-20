const jwt = require('jsonwebtoken');
const getLecturersByGroupCode = require('../lib/group-admin/getLecturersByGroupCode');
const Joi = require('joi');
const deleteUser = require('../lib/deleteUser');

exports.register = (server, options, next) => {

    const { pool, redisCli } = server.app;

    server.route([
        {
            method: 'GET',
            path: '/admin-dashboard',
            config: {
                auth: {
                    scope: 'group-admin'
                }
            },
            handler: (request, reply) => {
                // query to db to get all users associated with the code
                // minus the admins own account hehe
                // getLecturersByGroupCode
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                    /* istanbul ignore if */
                    if (error) { return reply(error); }
                    const { group_code, user_id } = decoded.user_details;

                    getLecturersByGroupCode(pool, group_code, (err, lecturers) => {
                        /* istanbul ignore if */
                        if (err) { return reply(err); }
                        else {
                            const filteredLecturers = lecturers.filter((lecturer) => { return lecturer.user_id !== user_id; })
                            reply({ lecturers: filteredLecturers });
                        }
                    });
                });
            }
        },
        {
            method: 'POST',
            path: '/group-admin/delete',
            config: {
                validate: {
                    payload: {
                        user_id: Joi.number()
                    }
                },
                auth: {
                    scope: 'group-admin'
                }
            },
            handler: (request, reply) => {
                deleteUser(pool, request.payload.user_id, (error, response) => {
                    /* istanbul ignore if */
                    if (error) reply(error);
                    if (response) reply(true);
                });
            }
        }
    ]);

    next();
};

exports.register.attributes = { pkg: { name: 'groupAdmin' } };