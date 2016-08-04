import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';


const Login = ({ signup, handleEmailChange, handlePasswordChange, handleAuthenticateUser }) => {

    let userValidation = classnames({
        "display-none": signup.userIsAuthenticated !== false
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
                            <input
                                className="input login-input"
                                value={ signup.username }
                                onChange={ (e) => handleEmailChange(e.target.value)}
                                type="email"
                                placeholder="Email"
                                />

                            <input
                                className="input login-input"
                                value={ signup.password }
                                onChange={ (e) => handlePasswordChange(e.target.value)}
                                type="password"
                                placeholder="Password"
                                />
                            <a className="button is-warning login-button" onClick={ () => handleAuthenticateUser(signup.email, signup.password) }>
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
    signup: PropTypes.object.isRequired,
    handleEmailChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    handleAuthenticateUser: PropTypes.func.isRequired
};

export default Login;
