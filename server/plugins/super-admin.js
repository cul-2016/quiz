import getAllUsers from '../lib/getAllUsers';
import deleteUser from '../lib/deleteUser';
import getFullQuestionSet from '../lib/getFullQuestionSet';
import getFullAnswerSet from '../lib/getFullAnswerSet';
import Joi from 'joi';
import Papa from 'papaparse';
var fs = require('fs');


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
        },
        {
            method: 'GET',
            path: '/super-admin/full-question-set',
            config: {
                auth: {
                    scope: 'super-admin'
                }
            },
            handler: (request, reply) => {

                getFullQuestionSet(pool, (error, response) => {
                    if (error) reply(error);
                    var CSV = Papa.unparse(response);
                    reply(CSV)
                    .header('Content-Type', 'text/csv')
                    .header('Content-Disposition', 'attachment; filename=reports.csv');
                });
            }
        },
        {
            method: 'GET',
            path: '/super-admin/full-answer-set',
            config: {
                auth: {
                    scope: 'super-admin'
                }
            },
            handler: (request, reply) => {

                getFullAnswerSet(pool, (error, response) => {
                    if (error) reply(error);
                    var CSV = Papa.unparse(response);
                    reply(CSV)
                    .header('Content-Type', 'text/csv')
                    .header('Content-Disposition', 'attachment; filename=reports.csv');
                });
            }
        }
    ]);

    next();
};

exports.register.attributes = { pkg: { name: 'superAdmin' } };
