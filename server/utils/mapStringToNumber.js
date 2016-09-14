
function mapStringToNumber (array, callback) {

    (function mapToNum (arr, i) {

        if (i === arr.length) {
            return callback(null, arr);
        }
        arr[i].average = parseFloat(arr[i].average);
        mapToNum(arr, ++i);
    })(array, 0);
}

module.exports = mapStringToNumber;
