/**
 * Function to extract cookie_message value from browser cookie.
 * Returns the cookie_message (boolean) if the cookie exists, or undefined.
 */
export default function isPopupRequired () {
    let cookieMessage;
    try {
        const result = document.cookie.match(/cookie_message=(true|false)/)[0].match(/(true|false)/);
        cookieMessage = result[0] === 'true';
    }
    catch (error) {
        console.error(error);
        cookieMessage = true;
    }
    finally {
        cookieMessage = true;
    }
    return cookieMessage;
}
