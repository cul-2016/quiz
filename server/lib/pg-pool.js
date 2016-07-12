var pg = require('pg');
var database = process.env.PRODUCTIONDB || 'testing';
var config = {
    database: database,
    max: '100',
    idleTimeoutMillis: 3000
};

var pool = new pg.Pool(config);

/**
 * Represents a function that queries the database.
 * @param {string} queryText - database client to which the function will need to connect to.
 * @param {array} queryArray - email for the given user
 * @param {Function} callback - password for the given user
 */
function query (queryText, queryArray, callback) {
    if (arguments.length === 2 && typeof arguments[1] !== 'function') {
        return callback(new TypeError('second argument for query must be a function'));
    }
    if (arguments.length === 3 && Array.isArray(arguments[1]) === false  && typeof arguments[1] !== 'function') {
        return callback(new TypeError('second argument for query must be an array and third argument must be a function'));
    }

    pool.connect((error, client, done) => {
        if (error) {
            callback(error);
        }

        if (arguments.length === 2 && typeof arguments[1] === 'function') {
            client.query(queryText, (error, result) => {
                done();
                if (error) {
                    callback(error);
                } else {
                    callback(null, result);
                }
            });
        } else {
            client.query(queryText, queryArray, (error, result) => {
                done();
                if (error) {
                    callback(error);
                } else {
                    callback(null, result);
                }
            });
        }
    });
}

module.exports = query;
