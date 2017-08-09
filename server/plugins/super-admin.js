


exports.register = (server, options, next) => {
    server.route([
        {
            method: 'GET',
            path: '/get-all-users',
            config: {
                auth: {
                    scope: 'super-admin'
                }
            },
            handler: (request, reply) => {
                reply("hello");
            }
        }
    ]);

    next();
};

exports.register.attributes = { pkg: { name: 'superAdmin' } };
