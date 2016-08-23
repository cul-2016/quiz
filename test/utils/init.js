var Server = require('../../server/server.js');
var Pool = require('pg').Pool;
var fs = require('fs');


if (!process.env.TESTING) {
    throw new Error('Please set up the testing environment variables');
}

const databaseName = process.env.CIRCLE_CI ? 'circle_test' : 'testing';
const testClient = new Pool({ database: databaseName, idleTimeoutMillis: 2000 });

testClient.connect((error, client, done) => {

    if (error) {
        if (error.code === 'ECONNREFUSED') {
            console.error("To run tests, you must be running a local instance of postgres!");
            process.exit(1);
        }
    }
    console.info('test client is connected'); //eslint-disable-line no-console
    var schema = fs.readFileSync(__dirname + '/test-schema.txt', 'utf8');

    client.query(schema, (error) => {
        if (error) {
            console.error('Problem with parsing the test database schema', error);
            process.exit(1);
        }
        done();
    });
});

module.exports = {
    server: Server.init(process.env.PORT),
    testClient: testClient
};
