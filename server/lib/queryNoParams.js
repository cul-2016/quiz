/**
 * Function to query the database.  Used when query requires no parameters
 * @param {object} pool - database client
 * @param {string} queryText - SQL query
 */

function queryNoParams (pool, queryText, callback) {

    if (arguments.length !== 3) {
        throw new Error('queryNoParams takes 3 arguments. Check documentation for more details');
    }
    if (typeof arguments[0] !== 'object') {
        throw new TypeError('First argument for queryNoParams must be the postgres client');
    }
    if (typeof arguments[1] !== 'string') {
        throw new TypeError('second argument for queryNoParams must be a string');
    }
    if (typeof arguments[2] !== 'function') {
        throw new TypeError('third argument for queryNoParams must be a function');
    }

    pool.connect((error, client, done) => {

        if (error) {
            return callback(error);
        }

        client.query(queryText, (error, result) => {
            done();
            if (error) {
                return callback(error);
            } else {
                return callback(null, result);
            }
        });
    });
}

module.exports = queryNoParams;
