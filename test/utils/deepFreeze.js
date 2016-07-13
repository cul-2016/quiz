/**
 * Makes an object 100% immutable: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 * @param {object} obj - the object to be frozen
 */

export default function deepFreeze (obj) {

    let propNames = Object.getOwnPropertyNames(obj);

    propNames.forEach((name) => {
        let prop = obj[name];

        if (typeof prop == 'object' && prop !== null) {

            deepFreeze(prop);
        }
    });

    return Object.freeze(obj);
}
