import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';

const AppLoading = ({ userState }) => {

    const previousPath = localStorage.getItem('previousPath');
    if (userState.user_id) {
        hashHistory.push(previousPath);
        localStorage.setItem('previousPath', null);
    }

    return (
        <div className="hero is-fullheight">
            <div className="hero-body">
                <div className="sk-folding-cube">
                    <div className="sk-cube1 sk-cube"></div>
                    <div className="sk-cube2 sk-cube"></div>
                    <div className="sk-cube4 sk-cube"></div>
                    <div className="sk-cube3 sk-cube"></div>
                </div>
            </div>
        </div>
    );
};

AppLoading.propTypes = {
    userState: PropTypes.object.isRequired
};

export default AppLoading;
