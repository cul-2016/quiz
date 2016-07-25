import validCookieExists from './validCookieExists';


const authenticate = (nextState, replace, callback) => {
    console.log("nextState", nextState);
    if (!validCookieExists()) {
        replace('/');
    }
    callback();
};

export default authenticate;
