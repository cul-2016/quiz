import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import classnames from 'classnames';
import logout from '../../lib/logout';


const hideNav = (path) => {
    return path === "/" || path.match(/live|holding-page|result|review|register-student|please-verify|verification|reset-password|performance|history|add-new-module|leaderboard|new-quiz|edit-quiz|edit-survey|members|register-lecturer-invite-only|privacy/);
};

const Nav = ({ location, is_lecturer, is_super_admin }) => {

    let navClasses = classnames("navbar", {
        "display-none": hideNav(location.pathname),
        "student": is_lecturer === false
    });

    return (
        <ul className={ navClasses}>
          <div className="navbar__inner">
            <div className="navbar__container">
              <li className="navbar__item navbar__item--left" onClick={ () => hashHistory.push('/dashboard') }>
                  <p className="navbar__link navbar__link--left">
                      Home
                  </p>
              </li>
              { is_super_admin && is_lecturer &&
                <li className="navbar__item navbar__item--left" onClick={ () => hashHistory.push('/super-admin') }>
                    <p className="navbar__link navbar__link--left">
                        Super Admin Dashboard
                    </p>
                </li>
              }
              <li className="navbar__item navbar__item--right" onClick={ logout }>
                <button className="button">
                    Logout
                </button>
              </li>
            </div>
          </div>
        </ul>
    );
};

Nav.propTypes = {
    location: PropTypes.object,
    is_lecturer: PropTypes.bool,
    is_super_admin: PropTypes.bool
};

export default Nav;
