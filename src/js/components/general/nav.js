import React, { PropTypes } from 'react';

const Nav = ({ username }) => {

    return (
        <nav className="nav">
            <div className="nav-left">
                <p className="nav-item is-brand">
                <strong>Welcome, </strong> {username || 'lecturer'}
                </p>
            </div>
            <div className="nav-right nav-menu">
                <p className="nav-item" >
                Logout
                </p>
            </div>
        </nav>
    );
};

Nav.propTypes = {
    username: PropTypes.string
};

export default Nav;
