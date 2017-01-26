import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import isEmail from 'validator/lib/isEmail';

const Signup = ({ register, handleChange, handleRegisteringUser, location }) => {

    let isEmailValid = isEmail(register.email);
    let is_lecturer;
    if (location.pathname === '/register-student') {
        is_lecturer = false;
    } else {
        is_lecturer = true;
    }

    let registerButtonClasses = classnames("button is-warning login-button", {
        "is-disabled": !isEmailValid || !register.password || !register.username || register.password !== register.confirmPassword,
        "is-loading": register.isRegistering === true
    });

    let invalidEmailClasses = classnames("help is-danger", {
        "display-none": register.email.length === 0 || isEmailValid
    });

    let passwordMatchClasses = classnames("input", {
        "is-success": register.confirmPassword !== "" && register.password === register.confirmPassword,
        "is-danger": register.confirmPassword.length >= register.password.length && register.confirmPassword !== register.password
    });

    let outerSectionClasses = classnames("login outer", {
        "blue-hero": is_lecturer === false
    });

    const submitOnEnter = (e) => {
        if (e.keyCode === 13 && isEmailValid && register.password && register.username) {
            handleRegisteringUser(register.email, register.username, register.password, is_lecturer);
        }
    };

    return (

        <section className={ outerSectionClasses }>
            <div className="middle">
                <div className="container inner has-text-centered">
                    <div className="box">
                        <h2>
                            Register
                        </h2>
                        { register.error &&
                            <span className="tag is-danger">
                                { register.error }
                            </span>
                        }

                        <label className="f-label has-text-left">Email address</label>
                        <input
                            onKeyDown={ submitOnEnter }
                            className="input"
                            value={ register.email }
                            onChange={ (e) => handleChange("email", e.target.value) }
                            type="email" />
                        <span className={ invalidEmailClasses }>This email is invalid</span>


                        <label className="f-label has-text-left">Choose a nickname</label>
                        <input
                            onKeyDown={ submitOnEnter }
                            className="input"
                            value={ register.username }
                            onChange={ (e) => handleChange("username", e.target.value)}
                            type="username"/>

                        <label className="f-label has-text-left">Choose a password</label>
                        <input
                            onKeyDown={ submitOnEnter }
                            className={ passwordMatchClasses }
                            value={ register.password }
                            onChange={ (e) => handleChange("password", e.target.value)}
                            type="password" />

                        <label className="f-label has-text-left">Confirm password</label>
                        <input
                            onKeyDown={ submitOnEnter }
                            className={ passwordMatchClasses }
                            value={ register.confirmPassword }
                            onChange={ (e) => handleChange("confirmPassword", e.target.value)}
                            type="password" />

                        <button className={ registerButtonClasses } onClick={ () => handleRegisteringUser(register.email, register.username, register.password, is_lecturer) }>
                            Register
                        </button>

                        <p>
                            <Link to="/">
                                <span className=" is-success">
                                    Already have an account? Please sign in here
                                </span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

Signup.propTypes = {
    register: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleRegisteringUser: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
};

export default Signup;
