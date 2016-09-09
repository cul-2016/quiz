
/**
 * Finds and returns a student's average score from an array of all scores
 * @param {number} user_id - user id
 * @param {array} averageScores - the average scores for all students
 * @param {function} callback - a callback function
 */


function getStudentPercentageScore (user_id, allPercentageScores, callback) {

    (function search (rows) {

        if (!rows.length) {
            return callback(new Error("Failed to find student's score"));
        }
        if (rows[0].user_id.toString() === user_id.toString()) {

            return callback(null, rows[0].average);
        }
        search(rows.slice(1));
    })(allPercentageScores);
}

module.exports = getStudentPercentageScore;
