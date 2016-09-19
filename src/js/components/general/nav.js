import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import classnames from 'classnames';
import logout from '../../lib/logout';


const hideNav = (path) => {
    return path === "/" || path.match(/live|holding-page|result|review/);
};

const Nav = ({ location, username }) => {

    let navClasses = classnames("nav has-shadow", {
        "display-none": hideNav(location.pathname)
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
                    <i className="fa fa-home"/>
                </span>

                <span className="nav-item is-hidden-tablet is-active" onClick={ logout }>
                    <i className="fa fa-sign-out" />
                </span>
            </div>
        </nav>
    );
};

Nav.propTypes = {
    username: PropTypes.string,
    location: PropTypes.object
};

export default Nav;
