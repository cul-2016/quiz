/**
 * Function to extract cul_is_cookie_accepted value from browser cookie.
 * Returns the cul_is_cookie_accepted (boolean) if the cookie exists, or undefined.
 */
export default function isCookieMessageRequired () {
    let isCookieAccepted;
    try {
        const result = document.cookie.match(/cul_is_cookie_accepted=(true|false)/)[0].match(/(true|false)/);
        return isCookieAccepted = result[0] === 'true';
    }
    catch (error) {
        console.error(error);
    }
    finally {
        isCookieAccepted = true;
    }
    return isCookieAccepted;
}
