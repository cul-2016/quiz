import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import classnames from 'classnames';
import logout from '../../lib/logout';


const hideNav = (path) => {
    return path === "/" || path.match(/live|holding-page|result|review|register-student|please-verify|verification|reset-password|performance|history|revise|add-new-module|leaderboard|new-quiz|edit-quiz|edit-survey|members|register-lecturer|privacy|register-moodle-student|register-moodle-lecturer|merge-users/);
};

const Nav = ({ location, is_lecturer, is_super_admin, is_group_admin }) => {

    let navClasses = classnames("navbar", {
        "display-none": hideNav(location.pathname),
        "student": is_lecturer === false
    });

    return (
        <ul className={ navClasses}>
          <div className="navbar__inner">
            <div className="navbar__container">
              <li className="navbar__item navbar__item--home" onClick={ () => hashHistory.push('/dashboard') }>
                  <img src="/assets/logo/nav_icon.svg" className="navbar__img"></img>
              </li>
              { is_super_admin && is_lecturer &&
                <li className="navbar__item navbar__item--dashboard">
                    <img onClick={() => hashHistory.push('/super-admin')} src="/assets/nav_dashboard_icon.svg" className=""></img>
                        <span onClick={() => hashHistory.push('/super-admin')} className="navbar__link pointer">Super Admin Dashboard</span>
                </li>
              }
              { is_group_admin &&
                <li className="navbar__item navbar__item--dashboard">
                    <img onClick={() => hashHistory.push('/admin-dashboard')} src="/assets/nav_dashboard_icon.svg" className=""></img>
                        <span onClick={() => hashHistory.push('/admin-dashboard')} className="navbar__link pointer">Admin Dashboard</span>
                </li>
              }
              <li className="navbar__item navbar__item--right" >
                    <button onClick={logout} className="button pointer">
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
    is_super_admin: PropTypes.bool,
    is_group_admin: PropTypes.bool
};

export default Nav;
