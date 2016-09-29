/**
 * Function to query the database
 * @param {object} pool - database client
 * @param {string} queryText - SQL query
 * @param {array} queryArray - variables for the SQL query
 */

function query (pool, queryText, queryArray, callback) {

    if (arguments.length !== 4) {
        throw new Error('query.params takes 4 arguments. Check documentation for more details');
    }
    if (typeof arguments[0] !== 'object') {
        throw new TypeError('First argument for query.params must be the postgres client');
    }
    if (arguments.length === 2 && typeof arguments[1] !== 'function') {
        throw new TypeError('second argument for query.params must be a function');
    }
    if (arguments.length === 3 && Array.isArray(arguments[1]) === false  && typeof arguments[1] !== 'function') {
        throw new TypeError('second argument for query.params must be an array and third argument must be a function');
    }

    pool.connect((error, client, done) => {

        if (error) {
            return callback(error);
        }

        client.query(queryText, queryArray, (error, result) => {
            done();
            if (error) {
                return callback(error);
            } else {
                return callback(null, result);
            }
        });
    });
}

module.exports = query;
