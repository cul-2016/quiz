/**
 * Represents a function that checks for the existence of a valid cookie
 */
export default function validCookieExists () {

    return document.cookie.indexOf("cul_id") !== -1;
}
