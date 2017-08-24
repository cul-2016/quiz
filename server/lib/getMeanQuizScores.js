var query = require('./query');
var queries = require('./queries.json');

/**
 * Returns the mean score for each quiz in a module {array}.
 * The returned array is in ascending numerical order of user id
 * @param {object} client - database client
 * @param {string} module_id - unique module id
 * @param {function} callback - callback function
 */


function getMeanQuizScores (client, module_id, callback) {

    query(client, queries.getMeanQuizScores, [module_id], (error, data) => {
        /* istanbul ignore if */
        if (error) {
            return callback(error);
        }

        (function stringToFloat (array, i) {

            if (i === array.length) {
                return callback(null, array);
            }
            array[i].mean_score = parseFloat(array[i].mean_score, 2);

            stringToFloat(array, ++i);
        })(data.rows, 0);
    });
}

module.exports = getMeanQuizScores;
