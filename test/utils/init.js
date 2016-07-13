import Server from '../../server/server.js';
export const server = Server.init(process.env.PORT);
import { Pool } from 'pg';
import fs from 'fs';


if (!process.env.TESTING) {
    throw new Error('Please set up the testing environment variables');
}

const databaseName = process.env.CIRCLE_CI ? 'circle_test' : 'testing';
export const testClient = new Pool({ database: databaseName, idleTimeoutMillis: 2000 });
// end to end testing => pool and testing pg client need to refer to the same one when testing endpoints!

testClient.connect((error, client, done) => {
    console.log('test client is connected');
    if (error) {
        console.error(error);
    }

    var schema = fs.readFileSync(__dirname + '/test-schema.txt', 'utf8');

    client.query(schema, (error, result) => {
        if (error) {
            console.error(error);
        }
        console.log("RESULT", result);
        done();

    });
});
