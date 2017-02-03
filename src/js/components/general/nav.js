import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import classnames from 'classnames';
import logout from '../../lib/logout';


const hideNav = (path) => {
    return path === "/" || path.match(/live|holding-page|result|review|register-student|please-verify|verification|reset-password|performance|history|add-new-module|leaderboard|new-quiz/);
};

const Nav = ({ location, is_lecturer }) => {

    let navClasses = classnames("navbar", {
        "display-none": hideNav(location.pathname),
        "student": is_lecturer === false
    });

    return (
        <ul className={ navClasses}>
            <li className="navbar__item" onClick={ () => hashHistory.push('/dashboard') }>
                <p className="navbar__link navbar__link--left">
                    Home
                </p>
            </li>
            <li className="navbar__item" onClick={ logout }>
                <p className="navbar__link navbar__link--right">
                    Logout
                </p>
            </li>
        </ul>
    );
};

Nav.propTypes = {
    location: PropTypes.object,
    is_lecturer: PropTypes.bool
};

export default Nav;
