/**
 * Function to extract user is_lecturer from browser cookie.
 * Returns the is_lecturer (boolean) if the cookie exists, or undefined.
 */


export default function isUserLecturer () {
    try {
        const result = document.cookie.match(/cul_is_lecturer=(true|false)/)[0].match(/(true|false)/);
        if (result[0] === 'true') {
            return true;
        } else {
            return false;
        }
    }
    catch (error) {
        console.error(error);
        return undefined;
    }
}
