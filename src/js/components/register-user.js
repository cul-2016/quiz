import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

const RegisterUser = ({ register, handleChange, handleRegisteringUser, location }) => {

    let is_lecturer;
    if (location.pathname === '/register-student') {
        is_lecturer = false;
    } else {
        is_lecturer = true;
    }

    let userExists = classnames({
        "display-none": register.userExists !== true
    });


    return (

        <section className="hero is-danger is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="columns">
                        <div className="box column is-one-third is-offset-one-third">
                            <h2 className="login-title">
                              Register
                            </h2>
                            <p className={ userExists }><span className="tag is-danger"> The email already exists please sign in</span></p>
                            <input
                                className="input login-input"
                                value={ register.email }
                                onChange={ (e) => handleChange("email", e.target.value) }
                                type="email"
                                placeholder="Email"
                                />
                            <input
                                className="input login-input"
                                value={ register.username }
                                onChange={ (e) => handleChange("username", e.target.value)}
                                type="username"
                                placeholder="Username"
                                />
                            <input
                                className="input login-input"
                                value={ register.password }
                                onChange={ (e) => handleChange("password", e.target.value)}
                                type="password"
                                placeholder="Password"
                                />

                            <a className="button is-warning login-button" onClick={ () => handleRegisteringUser(register.email, register.username, register.password, is_lecturer) }>
                                Register
                            </a>

                            <p>
                            <Link to="/"><span className="tag is-success">Already a user? Please Sign In here</span></Link>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

RegisterUser.propTypes = {
    register: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleRegisteringUser: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
};

export default RegisterUser;
