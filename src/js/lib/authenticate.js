import validCookieExists from './validCookieExists';


export function authenticate (nextState, replace, callback) {
    console.log("nextState", nextState);
    if (!validCookieExists()) {
        replace('/');
    }
    callback();
}

export default authenticate;
