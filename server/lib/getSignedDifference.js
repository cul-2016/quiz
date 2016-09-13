/**
 * Returns an array with the signed difference between the mean score and the student's score for each quiz.
 * Numbers returned are to two decimal places
 * @param {array} studentScores - student's scores for each quiz
 * @param {array} meanScores - mean scores for each quiz
 * @param {function} callback - callback function
 */


function getSignedDifference (studentScores, meanScores, callback) {

    (function difference (result, i) {

        if (i === studentScores.length) {
            return callback(null, result);
        }
        var quiz_id = studentScores[i].quiz_id;

        findIndex(quiz_id, meanScores, (meanScoreIndex) => {

            if (meanScoreIndex === -1) {
                return callback(new Error('`getSignedDifference`: student score and mean score arrays are imbalanced'));
            }
            result.push({
                quiz_id: quiz_id,
                difference: +(studentScores[i].score - meanScores[meanScoreIndex].mean_score).toFixed(2),
            });
            difference(result, ++i);
        });
    })([], 0);
}

module.exports = getSignedDifference;

function findIndex (quiz_id, meanScores, callback) {

    (function loop (index) {

        if (meanScores[index].quiz_id === quiz_id) {
            return callback(index);
        }
        if (index === meanScores.length) {
            return callback(-1);
        }
        loop(++index);
    })(0);
}
