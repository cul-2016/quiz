var query = require('./query');
var queries = require('./queries.json');

/**
 * Returns, for each student, the average score across all quizzes as a percentage {array}.
 * The returned array is in descending numerical order of average score
 * @param {object} client - postgres database client
 * @param {string} module_id - module id
 * @param {function} callback - a callback function
 */


function getAllPercentageScores (client, module_id, callback) {

    query(client, queries.getAllPercentageScores, [module_id], (error, result) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        (function mapToNum (array, i) {
            
            if (i === array.length) {
                return callback(null, array);
            }
            result.rows[i].average = parseFloat(result.rows[i].average);
            mapToNum(array, ++i);
        })(result.rows, 0);
    });
}

module.exports = getAllPercentageScores;
