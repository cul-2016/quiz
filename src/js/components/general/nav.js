import React, { PropTypes } from 'react';
import logout from '../../lib/logout';

const Nav = ({ username }) => {

    return (
        <nav className="nav">
            <div className="nav-left">
                <p className="nav-item is-brand">
                    <strong>Welcome,&ensp;</strong>{ username || 'lecturer'}
                </p>
            </div>
            
            <div className="nav-right nav-menu">
                <span className="nav-item">
                    <button className="button is-danger is-hidden-mobile" onClick={ logout }>
                        Logout
                    </button>
                    <i className="fa fa-sign-out is-hidden-tablet" onClick={ logout }/>
                </span>
            </div>
        </nav>
    );
};

Nav.propTypes = {
    username: PropTypes.string
};

export default Nav;
