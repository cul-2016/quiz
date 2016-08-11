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
            <div className="nav-right">
                <button className="nav-item" onClick= { logout }>
                    Logout
                </button>
            </div>
        </nav>
    );
};

Nav.propTypes = {
    username: PropTypes.string
};

export default Nav;
