import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import classnames from 'classnames';
import logout from '../../lib/logout';


const hideNav = (path) => {
    console.log(path, "<<<<<<<<<<");
    return path === "/" || path.match(/live|holding-page|result|review|register-student|please-verify|verification|reset-password|performance|history/);
};

const Nav = ({ location, is_lecturer }) => {
    console.log(location.pathname, '<<<<<<<<');

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
