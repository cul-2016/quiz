/**
 * Represents a function that Checks for the existence of a valid cookie
 */
export default function validCookieExists () {

    return document.cookie.indexOf("user_id") !== -1;
}
