import getAllUsers from '../lib/getAllUsers';


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
        }
    ]);

    next();
};

exports.register.attributes = { pkg: { name: 'superAdmin' } };
