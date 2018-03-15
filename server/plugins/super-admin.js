import getAllUsers from '../lib/getAllUsers';
import deleteUser from '../lib/deleteUser';
import getFullQuestionSet from '../lib/getFullQuestionSet';
import getFullAnswerSet from '../lib/getFullAnswerSet';
import saveClient from '../lib/super-admin/saveClient';
import Joi from 'joi';
import Papa from 'papaparse';
import shortid from 'shortid';
import groupAdminWelcome from '../lib/email/group-admin-welcome';
import individualLecturerWelcome from '../lib/email/individual-lecturer-welcome';
import getClients from '../lib/super-admin/getClients';

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

                    getClients(pool, (error, clients) => {
                        if (error) {
                            reply(error);
                        }
                        // otherwise return the clients
                        reply({ lecturers, students, clients });
                    });
                });
            }
        },
        {
            method: 'POST',
            path: '/super-admin/client',
            config: {
                auth: {
                    scope: 'super-admin'
                }
            },
            handler: (request, reply) => {

                const payload = request.payload;
                // if group_admin, then generate code and attach to payload before saving saveClient
                if (payload.accountType === 'group admin') {
                    const code = shortid.generate();
                    payload.code = code;
                } else {
                    payload.code = null;
                }
                // save information to database in new account management table
                saveClient(pool, request.payload, (error) => {
                    if (error) { return reply(error); }
                    else {

                        if (payload.accountType === 'group admin') {
                            groupAdminWelcome({ name: payload.name, email: payload.email, code: payload.code }, (error) => {
                                if (error) { return reply(error); }
                                else {
                                    return reply({ message: 'data has been successfully posted and user has been sent the email.' });
                                }
                            });
                        } else {
                            individualLecturerWelcome({ name: payload.name, email: payload.email }, (error) => {
                                if (error) { return reply(error); }
                                else {
                                    return reply({ message: 'data has been successfully posted and user has been sent the email.' });
                                }
                            });
                        }
                        // IF group admin
                        // then send email with code
                        // if normal lecturer
                        // then send email with no code.
                    }
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
                    .header('Content-Disposition', 'attachment; filename=full-question-set.csv');
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
                    .header('Content-Disposition', 'attachment; filename=full-answer-set.csv');
                });
            }
        }
    ]);

    next();
};

exports.register.attributes = { pkg: { name: 'superAdmin' } };
