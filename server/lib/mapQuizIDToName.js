var query = require('./query');
var queries = require('./queries.json');

/**
 * Maps an array of quiz ids to the quiz names
 * @param {object} client - database client
 * @param {array} array - array of quiz ids
 * @param {function} callback - callback function
 */


function mapQuizIDToName (client, array, callback) {

    if (array.length !== 2) {
        return callback(new RangeError("quiz_ids array should be of length 2"));
    }

    (function map (names, i) {

        if (i === array.length) {
            return callback(null, names);
        }
        let quiz_id = array[i].quiz_id;

        query(client, queries.mapQuizIDToName, [quiz_id], (error, result) => {

            if (error) {
                return callback(error);
            }
            names.push(result.rows[0]);
            map(names, ++i);
        });
    })([], 0);
}

module.exports = mapQuizIDToName;
