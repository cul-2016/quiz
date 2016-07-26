/**
 * Function to extract user ID from browser cookie.
 * Returns the user ID (string) if the cookie exists, or undefined.
 */


export default function getUserID () {
    try {
        const result = document.cookie.match(/cul_id=\d+/)[0].match(/\d+/);
        return result[0];
    }
    catch (error) {
        console.log(error);
        return undefined;
    }
}
