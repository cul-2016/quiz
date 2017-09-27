const fs = require('fs');

const initDb = (pool, redisCli) => () => {
    let schema;
    return new Promise((resolve, reject) => {

        pool.connect((error, client, done) => {

            if (error) {
                throw new Error(error);
            }
            if (process.env.TESTING) {
                schema = fs.readFileSync(__dirname + '/test-schema-local.txt', 'utf8');
            } else {
                schema = fs.readFileSync(__dirname + '/test-schema.txt', 'utf8');
            }

            client.query(schema, (error) => {
                done();
                if (error) {
                    return reject(error);
                }
                redisCli.flushall(resolve);
            });
        });
    });
};

module.exports = initDb;
