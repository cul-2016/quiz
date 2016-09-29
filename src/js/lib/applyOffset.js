/**
 * Function to apply an offset to a number.
 * Returns a number with the offset applied, or a dash (string) ('-')
 * @param {number} originalValue - starting number
 * @param {number} offset - the offset to apply
 */

export default function applyOffset (originalValue, offset) {

    return !isNaN(originalValue) ? originalValue + offset : '-';
}
