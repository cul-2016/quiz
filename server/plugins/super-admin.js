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
import updateGroupLecturerPaidColumn from '../lib/super-admin/updateGroupLecturerPaidColumn';
import getUserByEmail from '../lib/getUserByEmail';


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
                    /* istanbul ignore if */
                    if (error) {
                        reply(error);
                    }
                    const lecturers = users.filter(user => user.is_lecturer);
                    const students = users.filter(user => !user.is_lecturer);

                    getClients(pool, (error, clients) => {
                        /* istanbul ignore if */
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
                if (!payload.isEditingClient && payload.accountType === 'group admin') {
                    const code = shortid.generate();
                    payload.code = code;
                } else {
                    payload.code = null;
                }


                // for individual lecturer only
                if (payload.paid === false) {
                    getUserByEmail(pool, payload.email, (error, user) => {
                        /* istanbul ignore if */
                        if (error) { return reply(error); }
                        else {
                            if (user.length > 0) {
                                server.app.redisCli.del([user[0].user_id, 3, 4]);
                            }
                        }
                    });
                }


                // save information to database in new account management table
                saveClient(pool, request.payload, (error, client) => {
                    /* istanbul ignore if */
                    if (error) { return reply(error); }
                    else {

                        if (client[0].group_code) {
                            // find anyone in the users table that has the same code and update the admin_has_paid column to whatever the super admin assigns here.
                            updateGroupLecturerPaidColumn(pool, client[0].paid, client[0].group_code, (err, user_id) => {
                                /* istanbul ignore if */
                                if (err) { return reply(err); }
                                else {
                                    if (client[0].paid === false) {
                                        const ids = user_id.map((user) => { return user.user_id; });
                                        if (ids.length > 0) {
                                            server.app.redisCli.del(ids);
                                        }
                                    }
                                }
                            });
                        }
                        if (payload.accountType === 'group admin' && !payload.isEditingClient ) {
                            groupAdminWelcome({ name: payload.name, email: payload.email, code: payload.code }, (error) => {
                                /* istanbul ignore if */
                                if (error) { return reply(error); }
                                else {
                                    return reply({ message: 'data has been successfully posted and user has been sent the email.' });
                                }
                            });
                        } else if (payload.accountType === 'individual lecturer' && !payload.isEditingClient) {
                            individualLecturerWelcome({ name: payload.name, email: payload.email }, (error) => {
                                /* istanbul ignore if */
                                if (error) { return reply(error); }
                                else {
                                    return reply({ message: 'data has been successfully posted and user has been sent the email.' });
                                }
                            });
                        } else {
                            return reply({ message: 'user has been updated, but no email has been sent' });
                        }
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
                    /* istanbul ignore if */
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
                    /* istanbul ignore if */
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
                    /* istanbul ignore if */
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
