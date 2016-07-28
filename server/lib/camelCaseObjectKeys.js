/**
 * Function to convert object keys from snake_case to camelCase
 * Returns an object with the expected structure.
 * @param {object} object - the object to convert
 */

function convertToCamelCase (object) {

    String.prototype.toCamelCase = () => {
        // console.log("what we got", this);
        const snakeCase = new RegExp(/_/);

        try {

            let underscoreIndex = this.match(snakeCase).index;
            // console.log("index", underscoreIndex);
            let result = this.substr(0, underscoreIndex - 1) + this.charAt(underscoreIndex + 1).toUpperCase() + this.substr(underscoreIndex + 2);
            // console.log("AFTER CAMEL", result);
            return result;
        } catch (e) {

            return this;
        }
    };


    let copy = Object.assign({}, object);

    for (let key in copy) {
        console.log(key);
        console.log(key.prototype);
        copy[key.toCamelCase()] = object[key];
    }
    console.log(copy);
    return copy;

}
module.exports = convertToCamelCase;
