/**
 * Returns an array with the signed difference between the mean score and the student's score for each quiz.
 * Numbers returned are to two decimal places
 * @param {array} studentScores - student's scores for each quiz
 * @param {array} meanScores - mean scores for each quiz
 * @param {function} callback - callback function
 */


function getSignedDifference (studentScores, meanScores, callback) {

    if (studentScores.length !== meanScores.length) {
        return callback(new Error("student score and mean score arrays must be same length"));
    }

    (function difference (result, i) {

        if (i === studentScores.length) {
            return callback(null, result);
        }
        result.push({
            quiz_id: studentScores[i].quiz_id,
            difference: +(studentScores[i].score - meanScores[i].mean_score).toFixed(2),
        });

        difference(result, ++i);
    })([], 0);
}

module.exports = getSignedDifference;
