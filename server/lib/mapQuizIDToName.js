var queryNoParams = require('./queryNoParams');
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

    queryNoParams(client, queries.mapQuizIDToName, (error, result) => {

        if (error) {
            return callback(error);
        }
        (function map (names, i) {

            if (i === array.length) {
                return callback(null, names);
            }
            let quiz_id = array[i].quiz_id;

            filterDown(result.rows, quiz_id, (err, row) => {

                names.push(row);
                map(names, ++i);
            });

        })([], 0);
    });
}

function filterDown (data, quiz_id, callback) {

    (function fltr (data, i) {

        if (quiz_id === data[i].quiz_id) {
            return callback(null, data[i]);
        }
        fltr(data, ++i);
    })(data, 0);
}

module.exports = mapQuizIDToName;
