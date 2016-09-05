/**
 * Function to extract cookie_message value from browser cookie.
 * Returns the cookie_message (boolean) if the cookie exists, or undefined.
 */
export default function isPopupRequired () {
    try {
        const result = document.cookie.match(/cookie_message=(true|false)/)[0].match(/(true|false)/);
        return result[0] === 'true';
    }
    catch (error) {
        console.error(error);
        return undefined;
    }
}
