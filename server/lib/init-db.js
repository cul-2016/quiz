var fs = require('fs');
var Pool = require('pg').Pool;

process.on('unhandledRejection', (e) => {
    console.error(e.message, e.stack);
});

var db_pool = new Pool({ database: 'testing', idleTimeoutMillis: 2000 });

db_pool.connect((error, client, done) => {

    fs.readFile(__dirname + '/schema.txt', 'utf8', (error, schema) => {

        client.query(schema, (error, result) => { //eslint-disable-line no-unused-vars
            if (error) {
                console.error(error);
            }
            done();
            client.end();
        });
    });
});
