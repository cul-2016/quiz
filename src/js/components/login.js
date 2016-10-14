import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';


const Login = ({ login, handleEmailChange, handlePasswordChange, handleAuthenticateUser }) => {

    let isEmailValid = /.+@.+\..+/.test(login.email);

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

    return (
        <section className="login outer is-primary is-fullheight">
            <div className="middle">
                <div className="container inner has-text-centered">
                    <div className="box" onKeyDown={ (e) => { if (e.keyCode === 13 && isEmailValid && login.password.length !== 0) { handleAuthenticateUser(login.email, login.password); }}}>
                        <h2>Log In</h2>
                        <p className={ userValidation }>
                            <span className="tag is-danger">
                                Please enter a valid email and password
                            </span>
                        </p>
                        <label className="label has-text-left">Email</label>
                        <input
                            className="input"
                            value={ login.username }
                            onChange={ (e) => handleEmailChange(e.target.value)}
                            type="email" />
                        <span className={ invalidEmailClasses }>This email is invalid</span>


                        <label className="label has-text-left">Password</label>
                        <input
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
                                <span className=" is-success">
                                    Sign up here
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
