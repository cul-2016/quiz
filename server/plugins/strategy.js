exports.register = (server, options, next) => {
    const validate = (decoded, request, callback) => {
        if (!decoded.user_details.user_id) {
            return callback(null, false);
        }
        server.app.redisCli.getAsync(decoded.user_details.user_id)
            .then((res) => {
              const twoWeeks = 60 * 60 * 24 * 14;
              server.app.redisCli.expire(decoded.user_details.user_id.toString(), twoWeeks)
              res === decoded.uid
              ? callback(null, true)
              : callback(null, false);
            })
            .catch((error) => {
                /*istanbul ignore next*/
                callback(error, false);
            });
    };

    server.auth.strategy('strategy', 'jwt', {
        key: process.env.JWT_SECRET,
        validateFunc: validate,
        verifyOptions: {
            algorithms: ['HS256']
        }
    });

    server.auth.default('strategy');

    next();
};

exports.register.attributes = { pkg: { name: 'strategy' } };
