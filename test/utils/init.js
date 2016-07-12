import Server from '../../server/server.js';
export const server = Server.init(process.env.PORT);
import { Pool } from 'pg';
var fs = require('fs');


if (!process.env.TESTING) {
    throw new Error('Please set up the testing environment variables');
}

export const testClient = new Pool({ database: 'testing', idleTimeoutMillis: 2000 });
// end to end testing => pool and testing pg client need to refer to the same one when testing endpoints!

testClient.connect((error, client, done) => {
    console.log('you are in connect in init.js');

    var schema = fs.readFileSync(__dirname + '/test-schema.txt', 'utf8');

    client.query(schema, (error, result) => {
        if (error) {
            console.error(error);
        }
        console.log("RESULT", result);
        done();

    });
});
