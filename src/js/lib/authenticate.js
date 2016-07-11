import validCookieExists from './validCookieExists';

const authenticate = (nextState, replace, callback) => {
    if (!validCookieExists()) {
        replace('/');
    }
    callback();
};

export default authenticate;
