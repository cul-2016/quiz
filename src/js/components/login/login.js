import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import isEmail from 'validator/lib/isEmail';
import lowerCaseBeforeAt from '../../lib/lowerCaseBeforeAt.js';

const Login = ({ login, user, handleEmailChange, handlePasswordChange, location, handleAuthenticateUser, handleMigrateUser }) => {
    const submit = login.isMerging ? () => handleMigrateUser(login.email, login.password, location.query.module) : () => handleAuthenticateUser(login.email, login.password);

    const submitOnEnter = (e) => {
        if (e.keyCode === 13 && isEmail(login.email) && login.password.length !== 0) {
            submit();
        }
    };

    const handleOnSubmit = () => {
        if (isEmail(login.email) && login.password.length !== 0) {
          submit();
        }
    };

    return (
        <div className="login">

            <div className="content__body content__body--login">
              <div className="header">
                  <img src="/assets/logo/Login_signup_icon.svg"></img>
                  <h3 className="f-title"> Realtime Quizzes for Better Lectures</h3>
                  { login.isMerging &&
                    <p>Confirm email and password to merge your accounts</p>
                  }
              </div>
              <div className="form">
                <div className="form__field f-body">
                  <label className="form__label">Email</label>
                  <input
                    onKeyDown={ submitOnEnter }
                    onChange={ (e) => handleEmailChange(lowerCaseBeforeAt(e.target.value).trim()) }
                    className="form__input"
                    type="text"
                    defaultValue={login.isMerging ? user.email : ''}
                    ></input>
                </div>
                <div className="form__field f-body">
                  <label className="form__label">Password</label>
                  <input
                    onKeyDown={ submitOnEnter }
                    onChange={ (e) => handlePasswordChange(e.target.value) }
                    className="form__input"
                    type="password"
                    ></input>
                  <Link className="login__link login__link--left f-body f-body--link" to="/request-reset-password"> Forgotten Password</Link>
                </div>
                <div className={ `${login.userIsAuthenticated ? 'display-none' : 'f-body--warning'} login-warning` }>
                  { login.message }
                </div>
                <div className={ login.email && !isEmail(login.email) ? 'f-body--warning' : 'display-none' }>
                  Invalid Email Address
                </div>
                <button id="ga-signin" onClick={ handleOnSubmit } className="button">{login.isMerging ? 'Merge Accounts' : 'Log In'}</button>

                { !login.isMerging &&
                  <div className="login__links">
                    <p className="f-body"> Don&#39;t have an Account? </p>
                    <Link className="login__link f-body f-body--link" to="/register-student"> Sign Up </Link>

                  </div>
                }

              </div>

            </div>
        </div>
    );
};

Login.propTypes = {
    login: PropTypes.object.isRequired,
    handleEmailChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    handleAuthenticateUser: PropTypes.func.isRequired
};

export default Login;
