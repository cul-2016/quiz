import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import isEmail from 'validator/lib/isEmail';
import lowerCaseBeforeAt from '../../lib/lowerCaseBeforeAt.js';

const Login = ({ login, handleEmailChange, handlePasswordChange, handleAuthenticateUser }) => {

    const submitOnEnter = (e) => {
        if (e.keyCode === 13 && isEmail(login.email) && login.password.length !== 0) {
            handleAuthenticateUser(login.email, login.password);
        }
    };

    const handleOnSubmit = () => {
        if (isEmail(login.email) && login.password.length !== 0) {
            handleAuthenticateUser(login.email, login.password);
        }
    };

    return (
        <div className="login">

            <div className="content__body">
              <div className="header">
                  <h1 className="f-headline"><img src="/Yellow.svg"></img></h1>
                  <h3 className="f-headline"> Realtime Quizzes for better lectures </h3>
              </div>
              <div className="form">
                <div className="form__field f-body">
                  <label className="form__label">Email</label>
                  <input
                    onKeyDown={ submitOnEnter }
                    onChange={ (e) => handleEmailChange(lowerCaseBeforeAt(e.target.value).trim()) }
                    className="form__input"
                    type="text"
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
                </div>
                <div className={ login.userIsAuthenticated ? 'display-none' : 'f-body--warning' }>
                  { login.message }
                </div>
                <div className={ login.email && !isEmail(login.email) ? 'f-body--warning' : 'display-none' }>
                  Invalid Email Address
                </div>
                <button onClick={ handleOnSubmit } className="button button__primary">
                  <p className="f-subheader">Log in</p>
                </button>
                <p className="f-body f-body--dark"> Don't have an Account? </p>
                <div> <Link className="f-body" to="/register-student"> Sign Up </Link> </div>

                <div className="forgotten-password"> <Link className="f-body" to="/request-reset-password"> Forgotten Password </Link> </div>
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
