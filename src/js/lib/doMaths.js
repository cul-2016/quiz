export default function doMaths (originalValue, offset) {

    return !isNaN(originalValue) ? originalValue + offset : '-';
}
