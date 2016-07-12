'use strict';
var fs = require('fs');
var pool = require('./init-db');

pool.connect((error, client, done) => {

    let path_to_schema = process.env.TESTING ? '/schema.txt' : 'path-to-proper-schema';

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
