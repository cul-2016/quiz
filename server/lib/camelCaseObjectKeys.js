/**
 * Function to convert object keys from snake_case to camelCase
 * Returns an object with the expected structure.
 * @param {object} object - the object to convert
 */

function convertToCamelCase (object) {

    String.prototype.toCamelCase = (e) => {
        /*
        // console.log("what we got", this);
        const snakeCase = new RegExp(/_/);
        console.log("E", e);
        // try {
            console.log("THIS", this.valueOf());
            let underscoreIndex = this.valueOf().match(snakeCase).index;
            // console.log("index", underscoreIndex);
            let result = this.valueOf().substr(0, underscoreIndex - 1) + this.valueOf().charAt(underscoreIndex + 1).toUpperCase() + this.valueOf().substr(underscoreIndex + 2);
            // console.log("AFTER CAMEL", result);
            return result;
        // } catch (e) {

            // return this;
        // }
        */
        return 8;
    };


    let copy = Object.assign({}, object);

    for (let key in copy) {
        console.log("key", key.valueOf());
        // console.log("prototype", String.prototype.toUpperCase);
        console.log("res", key.toCamelCase());
        copy[key.toCamelCase()] = object[key];
    }
    console.log(copy);
    return copy;

}
module.exports = convertToCamelCase;
