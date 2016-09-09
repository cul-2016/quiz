/**
 * Returns the min and max values in an array of signed differences
 * @param {array} differences - array of signed differences
 * @param {function} callback - callback function
 */


function getMinAndMaxValues (array, callback) {

    return callback(null, [
        array.reduce((prev, curr) => prev.difference < curr.difference ? prev : curr),
        array.reduce((prev, curr) => prev.difference > curr.difference ? prev : curr)
    ]);
}

module.exports = getMinAndMaxValues;
