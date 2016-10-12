import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import classnames from 'classnames';
import logout from '../../lib/logout';


const hideNav = (path) => {
    return path === "/" || path.match(/live|holding-page|result|review|register-student/);
};

const Nav = ({ location, username, is_lecturer }) => {

    let navClasses = classnames("nav has-shadow", {
        "display-none": hideNav(location.pathname),
        "student": is_lecturer === false
    });

    let dashboardClasses = classnames("nav-item is-hidden-mobile", {
        "is-active": window.location.hash.indexOf("dashboard") > -1,
    });

    return (
        <nav className={ navClasses }>
            <div className="nav-left">
                <p className="nav-item is-brand">
                    <strong>Welcome,&ensp;</strong>{ username || 'lecturer' }
                </p>
            </div>

            <div className="nav-right">
                <span className={ dashboardClasses }>
                    <button className="button" onClick={ () => hashHistory.push('/dashboard') }>
                        <i className="fa fa-home" />
                        &nbsp;to dashboard
                    </button>
                </span>

                <span className="nav-item is-hidden-mobile">
                    <button className="button is-danger" onClick={ logout }>
                        Logout
                    </button>
                </span>

                <span className="nav-item is-hidden-tablet is-active" onClick={ () => hashHistory.push('/dashboard') }>
                    <span className="icon">
                        <i className="fa fa-home"/>
                    </span>
                </span>

                <span className="nav-item is-hidden-tablet is-active" onClick={ logout }>
                    <span className="icon is-danger">
                        <i className="fa fa-sign-out is-danger" />
                    </span>
                </span>
            </div>
        </nav>
    );
};

Nav.propTypes = {
    username: PropTypes.string,
    location: PropTypes.object,
    is_lecturer: PropTypes.bool
};

export default Nav;
