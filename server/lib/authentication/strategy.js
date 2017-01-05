exports.register = (server, options, next) => {
    const validate = (decoded, request, callback) => {
        if (!request.state.cul_id) {
            return callback(new Error('undefined' + request.state, false));
        }
        client.getAsync(request.state.cul_id)
            .then((res) => {
                res === decoded.uid
                ? callback(null, true)
                : callback(null, false);
            })
            .catch((error) => {
                callback(error, false);
            });
    }

    server.auth.strategy('strategy', 'jwt', {
        key: 'secret',
        validateFunc: validate,
        verifyOptions: {
            algorithms: ['HS256']
        }
    });

    server.auth.default('strategy');

    next();
};

exports.register.attributes = { pkg: { name: 'strategy' } };
