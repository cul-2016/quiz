var quantileSorted = require('simple-statistics').quantileSorted;

/**
 * A function that returns an array of the lowest student score
 * for each percentile range
 * @param {array} averageScores - the average scores for all students
 * @param {array} boundaries - array of numbers representing the top-end of a percentile range.  E.g. 11%-25% is represented by 25.
 * @param {function} callback - a callback function
 */


function getPercentileValues (averageScores, boundaries, callback) {

    let sample = averageScores.map((elem) => {
        return elem.average;
    });
    let boundariesAsDecimal = boundaries.map((boundary) => {
        return boundary / 100;
    });
    let values = [];

    (function getPercentile (remainingBoundaries, result) {

        if (!remainingBoundaries.length) {
            return callback(null, result);
        }
        result.push(quantileSorted(sample, remainingBoundaries[0]));

        getPercentile(remainingBoundaries.slice(1), result);
    })(boundariesAsDecimal, values);
}


module.exports = getPercentileValues;
