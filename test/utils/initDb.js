const fs = require('fs');

const initDb = (pool, redisCli) => () => {
    return new Promise((resolve, reject) => {

        pool.connect((error, client, done) => {

            if (error) {
                throw new Error(error);
            }
            const schema = fs.readFileSync(
                __dirname + '/test-schema.txt', 'utf8'
            );

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
