export default function validCookieExists () {

    return document.cookie.indexOf("quizID") !== -1;
}
