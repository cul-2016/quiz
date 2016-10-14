import React, { PropTypes } from 'react';
import Spinner from './spinner';
import { hashHistory } from 'react-router';

const AppLoading = ({ userState }) => {

    const previousPath = localStorage.getItem('previousPath');
    if (userState.user_id) {
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
