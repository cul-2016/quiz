/**
 * Validates the form and returns true if everything has been validated, else returns false
 * Returns an object containing the next question (object) and the socket room name (string).
 * @param {object} - store - the redux store
 */

export default function validateForm (name, module_id, moduleIDExists, medals, trophies) {
    return !name || module_id.length !== 4 || moduleIDExists ||  medals[0] === '-' || !medals[1] === '-' || !trophies.condition[0] || !trophies.condition[1] || !trophies.condition[2] || !trophies.condition[3];
}
