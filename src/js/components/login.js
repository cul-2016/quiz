import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';


const Login = ({ login, handleEmailChange, handlePasswordChange, handleAuthenticateUser }) => {

    let userValidation = classnames({
        "display-none": login.userIsAuthenticated !== false
    });

    return (
        <section className="hero is-primary is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="columns">
                        <div className="box column is-one-third is-offset-one-third">
                            <h2 className="login-title">
                              Log In
                            </h2>
                            <p className={ userValidation }> <span className="tag is-danger">Please enter a valid email and password</span></p>
                            <label className="label">Email</label>
                            <input
                                className="input login-input"
                                value={ login.username }
                                onChange={ (e) => handleEmailChange(e.target.value)}
                                type="email"
                                placeholder="Email"
                                />

                            <label className="label">Password</label>
                            <input
                                className="input login-input"
                                value={ login.password }
                                onChange={ (e) => handlePasswordChange(e.target.value)}
                                type="password"
                                placeholder="Password"
                                />
                            <a className="button is-warning login-button" onClick={ () => handleAuthenticateUser(login.email, login.password) }>
                                Login
                            </a>
                            <p>
                            <Link to="/register-student"><span className="tag is-success">Not a user already? Please Register here</span></Link>
                            </p>
                        </div>
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
