/**
 * Function to query the database using a prepared query
 * @param {object} pool - database client
 * @param {string} queryText - SQL query
 * @param {array} queryArray - variables for the SQL query
 */

function preparedQuery (pool, preparedQuery, callback) {

    if (arguments.length !== 3) {
        throw new Error('query.params takes 4 arguments. Check documentation for more details');
    }
    if (typeof arguments[0] !== 'object') {
        throw new TypeError('First argument for query.params must be the postgres client');
    }

    pool.connect((error, client, done) => {
        /* istanbul ignore if */
        if (error) {
            return callback(error);
        }

        client.query(preparedQuery, (error, result) => {
            done();
            /* istanbul ignore if */
            if (error) {
                return callback(error);
            } else {
                return callback(null, result);
            }
        });
    });
}

module.exports = preparedQuery;
