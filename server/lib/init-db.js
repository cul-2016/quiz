var fs = require('fs');
var Pool = require('pg').Pool;

process.on('unhandledRejection', (e) => {
    console.error(e.message, e.stack);
});
let db_url = process.env.TESTING ? 'testing' : 'remote-db-url';
const db_pool = new Pool({ database: db_url, idleTimeoutMillis: 2000 });

db_pool.connect((error, client, done) => {

    let path_to_schema = process.env.TESTING ? '/test-schema.txt' : 'path-to-proper-schema';

    fs.readFile(__dirname + path_to_schema, 'utf8', (error, schema) => {

        if (error) {
            throw new Error("Error reading file:", error);
        }

        client.query(schema, (error, result) => {
            if (error) {
                console.error(error);
            }
            console.log("RESULT", result);
            done();
            client.end();
        });
    });
});
