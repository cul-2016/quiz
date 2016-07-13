/**
 * Checks for the existence of a valid cookie
 */

export default function validCookieExists () {

    return document.cookie.indexOf("quiz_id") !== -1;
}
