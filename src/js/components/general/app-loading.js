import React, { PropTypes } from 'react';
import Spinner from './spinner';
import { hashHistory } from 'react-router';
import logout from '../../lib/logout';

const AppLoading = ({ userState }) => {
    let previousPath;
    let timeout = setTimeout(() => {
        localStorage.removeItem("previousPath");
        logout();
    }, 20000);

    if (localStorage.getItem('previousPath') === 'app-loading' || !localStorage.getItem('previousPath')) {
        previousPath = '/';
    } else {
        previousPath = localStorage.getItem('previousPath');
    }

    if (userState.user_id) {
        clearTimeout(timeout);
        hashHistory.push(previousPath);
        localStorage.removeItem("previousPath");
    }

    return (
        <Spinner />
    );
};

AppLoading.propTypes = {
    userState: PropTypes.object.isRequired
};

export default AppLoading;
