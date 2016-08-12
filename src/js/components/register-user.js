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

        <section className="login hero is-primary is-fullheight">
            <div className="hero-body">
                <div className="container narrow has-text-centered">
                    <div className="box">
                        <h2>
                            Register
                        </h2>
                        <p className={ userExists }>
                            <span className="tag is-danger">
                                This email already exists. Follow link below to sign in
                            </span>
                        </p>

                        <label className="label has-text-left">Email address</label>
                        <input
                            className="input"
                            value={ register.email }
                            onChange={ (e) => handleChange("email", e.target.value) }
                            type="email" />

                        <label className="label has-text-left">Choose a username</label>
                        <input
                            className="input"
                            value={ register.username }
                            onChange={ (e) => handleChange("username", e.target.value)}
                            type="username"/>

                        <label className="label has-text-left">Choose a password</label>
                        <input
                            className="input"
                            value={ register.password }
                            onChange={ (e) => handleChange("password", e.target.value)}
                            type="password" />

                        <button className="button is-warning login-button" onClick={ () => handleRegisteringUser(register.email, register.username, register.password, is_lecturer) }>
                            Register
                        </button>

                        <p>
                            <Link to="/">
                                <span className="tag is-success">
                                    Already a user? Please Sign In here
                                </span>
                            </Link>
                        </p>
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
