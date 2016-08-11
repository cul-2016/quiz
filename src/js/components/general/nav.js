import React, { PropTypes } from 'react';
import logout from '../../lib/logout';

const Nav = ({ username }) => {

    return (
        <nav className="nav">
            <div className="nav-left">
                <p className="nav-item is-brand">
                    <strong>Welcome, </strong> {username || 'lecturer'}
                </p>
            </div>
            <div className="nav-right nav-menu">
                <span className="nav-item">
                <button className="button is-danger" onClick= { logout }>
                    Logout
                </button>
                </span>
            </div>
        </nav>
    );
};

Nav.propTypes = {
    username: PropTypes.string
};

export default Nav;
