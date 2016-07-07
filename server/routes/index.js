exports.register = (server, options, next) => {

    server.route([
        {
            method: 'GET',
            path: '/{all*}',
            config: {
                description: 'serves up all the files',
                handler: {
                    directory: {
                        path: "public"
                    }
                }
            }
        }
    ]);

    return next();
};

exports.register.attributes = {
    name: 'Home'
};
