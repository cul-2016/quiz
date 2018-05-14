const jwt = require('jsonwebtoken');
const Joi = require('joi');
const Papa =  require('papaparse');
const getLecturersByGroupCode = require('../lib/group-admin/getLecturersByGroupCode');
const updateUserIsActive = require('../lib/group-admin/updateUserIsActive');
const getGroupAccountLimitInformation = require('../lib/group-admin/getGroupAccountLimitInformation');
const getFullGroupData = require('../lib/getFullGroupData');


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

                            getGroupAccountLimitInformation(pool, group_code, (err, userAccountLimitInformation) => {
                                /* istanbul ignore if */
                                if (err) { return reply(err); }
                                else {

                                    const filteredLecturers = lecturers.filter((lecturer) => lecturer.user_id !== user_id);
                                    reply({ lecturers: filteredLecturers, userAccountLimitInformation: userAccountLimitInformation[0] });
                                }
                            });
                        }
                    });
                });
            }
        },
        {
            method: 'POST',
            path: '/group-admin/update',
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
                const { user_id } = request.payload;
                updateUserIsActive(pool, user_id, (error, user) => {
                    /* istanbul ignore if */
                    if (error) reply(error);
                    else {
                        if (!user.is_user_active) {
                            redisCli.del(user_id);
                        }
                        reply(true);
                    }
                });
            }
        },
        {
            method: 'GET',
            path: '/group-admin/full-group-data',
            config: {
                auth: {
                    scope: 'group-admin'
                }
            },
            handler: (request, reply) => {
                getFullGroupData(pool, request.auth.credentials.user_details.group_code, (error, response) => {
                    /* istanbul ignore if */
                    if (error) reply(error);
                    var CSV = Papa.unparse(response);
                    console.log(CSV);
                    reply(CSV)
                    .header('Content-Type', 'text/csv')
                    .header('Content-Disposition', 'attachment; filename=full-group-data.csv');
                });
            }
        },
    ]);

    next();
};

exports.register.attributes = { pkg: { name: 'groupAdmin' } };
