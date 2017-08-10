import getAllUsers from '../lib/getAllUsers';
import deleteUser from '../lib/deleteUser';
import Joi from 'joi';

exports.register = (server, options, next) => {
    const { pool } = server.app;

    server.route([
        {
            method: 'GET',
            path: '/super-admin',
            config: {
                auth: {
                    scope: 'super-admin'
                }
            },
            handler: (request, reply) => {
                getAllUsers(pool, (error, users) => {
                    if (error) {
                        reply(error);
                    }
                    const lecturers = users.filter(user => user.is_lecturer);
                    const students = users.filter(user => !user.is_lecturer);
                    reply({ lecturers, students });
                });
            }
        },
        {
            method: 'POST',
            path: '/super-admin/delete',
            config: {
                validate: {
                    payload: {
                        user_id: Joi.number()
                    }
                },
                auth: {
                    scope: 'super-admin'
                }
            },
            handler: (request, reply) => {
                console.log(request);
                deleteUser(pool, request.payload.user_id, (error, response) => {
                    if (error) reply(error);
                    if (response) reply(true);
                });
            }
        }
    ]);

    next();
};

exports.register.attributes = { pkg: { name: 'superAdmin' } };
