import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import isEmail from 'validator/lib/isEmail';


const Login = ({ login, handleEmailChange, handlePasswordChange, handleAuthenticateUser }) => {

    let isEmailValid = isEmail(login.email);

    let userValidation = classnames({
        "display-none": login.userIsAuthenticated !== false
    });

    let submitButtonClasses = classnames("button is-warning", {
        "is-loading": login.isAuthenticating === true,
        "is-disabled": !isEmailValid || login.password.length === 0
    });

    let invalidEmailClasses = classnames("help is-danger", {
        "display-none": login.email.length === 0 || isEmailValid
    });

    const submitOnEnter = (e) => {
        if (e.keyCode === 13 && isEmailValid && login.password.length !== 0) {
            handleAuthenticateUser(login.email, login.password);
        }
    };

    return (
        <section className="login outer blue-hero">
            <div className="middle">
                <div className="container inner has-text-centered">
                    <div className="box">
                        <h2>Log In</h2>
                        <p className={ userValidation }>
                            <span className="tag is-danger">
                                { login.message }
                            </span>
                        </p>
                        <label className="label has-text-left">Email</label>
                        <input
                            onKeyDown={ submitOnEnter }
                            className="input"
                            value={ login.username }
                            onChange={ (e) => handleEmailChange(e.target.value)}
                            type="email" />
                        <span className={ invalidEmailClasses }>This email is invalid</span>


                        <label className="label has-text-left">Password</label>
                        <input
                            onKeyDown={ submitOnEnter }
                            className="input"
                            value={ login.password }
                            onChange={ (e) => handlePasswordChange(e.target.value) }
                            type="password" />

                        <button className={ submitButtonClasses }
                                onClick={ () => handleAuthenticateUser(login.email, login.password) }>
                            Login
                        </button>
                        <p>
                            <Link to="/register-student">
                                <span>
                                    Sign up here
                                </span>
                            </Link>
                        </p>
                        <p>
                            <Link to="/request-reset-password">
                                <span>
                                    Forgotten password
                                </span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

Login.propTypes = {
    login: PropTypes.object.isRequired,
    handleEmailChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    handleAuthenticateUser: PropTypes.func.isRequired
};

export default Login;
