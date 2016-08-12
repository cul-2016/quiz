import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';


const Login = ({ login, handleEmailChange, handlePasswordChange, handleAuthenticateUser }) => {

    let userValidation = classnames({
        "display-none": login.userIsAuthenticated !== false
    });

    return (
        <section className="login hero is-primary is-fullheight">
            <div className="hero-body">
                <div className="container narrow has-text-centered">
                    <div className="box">
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

                        <label className="label has-text-left">Password</label>
                        <input
                            className="input"
                            value={ login.password }
                            onChange={ (e) => handlePasswordChange(e.target.value) }
                            type="password" />

                        <button className="button is-warning" onClick={ () => handleAuthenticateUser(login.email, login.password) }>
                            Login
                        </button>
                        <p>
                            <Link to="/register-student">
                                <span className="tag is-success">
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
