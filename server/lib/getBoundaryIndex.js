/**
 * Returns index of percentile boundary to which a student's score belongs
 * @param {number} score - student's score
 * @param {array} range - percentile boundary values in descending order
 * @param {function} callback - callback function
 */

function getBoundaryIndex (score, range, callback) {

    if (score > 100 || score < 0) {
        return callback(new RangeError('Score must be between 0 and 100'));
    }

    (function search (index) {

        if (index === range.length) {
            return callback(new Error("Failed to find index"));
        }
        if (range[index] <= score) {
            return callback(null, index);
        }
        search(++index);
    })(0);
}

module.exports = getBoundaryIndex;
