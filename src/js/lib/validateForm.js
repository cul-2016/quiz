/**
 * Validates the form and returns true if everything has been validated, else returns false
 * @param {string} - name - the name of the module
 * @param {string} - module_id - the id for the given module
 * @param {boolean} - moduleIDExists - boolean value to check whether the module_id exists in the db already
 * @param {array} - medals - conditions for the medals in the module
 * @param {object} - trophies - trophy names and conditions for each trophy 
 */

export default function validateForm (name, module_id, moduleIDExists, medals, trophies) {
    return !name || module_id.length !== 4 || moduleIDExists ||  medals[0] === '-' || !medals[1] === '-' || !trophies.condition[0] || !trophies.condition[1] || !trophies.condition[2] || !trophies.condition[3];
}
