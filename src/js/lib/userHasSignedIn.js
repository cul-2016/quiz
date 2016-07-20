import validCookieExists from './validCookieExists';

const userHasSignedIn = (nextState, replace, callback) => {

    if (validCookieExists()) {
        replace('/auth');
    }
    callback();
};

export default userHasSignedIn;
