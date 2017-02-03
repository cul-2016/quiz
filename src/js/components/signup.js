import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import isEmail from 'validator/lib/isEmail';
import lowerCaseBeforeAt from '../lib/lowerCaseBeforeAt.js';

const Signup = ({ register, handleChange, handleRegisteringUser, location }) => {

    const isEmailValid = isEmail(register.email);

    const is_lecturer = location.pathname !== '/register-student';

    let invalidEmailClasses = classnames("help is-danger", {
        "display-none": register.email.length === 0 || isEmailValid
    });

    let passwordMatchClasses = classnames("form__input", {
        "is-success": register.confirmPassword !== "" && register.password === register.confirmPassword,
        "is-danger": register.confirmPassword.length >= register.password.length && register.confirmPassword !== register.password
    });

    const submitOnEnter = (e) => {
        if (e.keyCode === 13) {
            handleOnSubmit();
        }
    };

    const handleOnSubmit = () => {
        if (isEmailValid
            && register.password
            && register.username
            && register.password === register.confirmPassword
        ) {
            handleRegisteringUser(
                lowerCaseBeforeAt(register.email).trim(),
                register.username,
                register.password,
                is_lecturer
            );
        }
    };

    return (
        <div className="login">
            <p className="f-headline">
                Register
            </p>
            { register.error &&
                <span className="login__err-message">
                    { register.error }
                </span>
            }

            {
              register.confirmPassword
              && register.confirmPassword !== register.password
              &&
                <span className="login__err-message"> Passwords are not matching </span>
            }

            <div className="form">
                <div className="form__field f-body">
                <label className="form__label">Email address</label>
                <input
                    onKeyDown={ submitOnEnter }
                    className="form__input"
                    value={ register.email }
                    onChange={ (e) => handleChange("email", e.target.value) }
                    type="email" />
                <span className={ invalidEmailClasses }>This email is invalid</span>
                </div>


                <div className="form__field f-body">
                <label className="form__label">Choose a nickname</label>
                <input
                    onKeyDown={ submitOnEnter }
                    className="form__input"
                    value={ register.username }
                    onChange={ (e) => handleChange("username", e.target.value)}
                    type="username"/>
                </div>

                <div className="form__field f-body">
                <label className="form__label">Choose a password</label>
                <input
                    onKeyDown={ submitOnEnter }
                    className={ passwordMatchClasses }
                    value={ register.password }
                    onChange={ (e) => handleChange("password", e.target.value)}
                    type="password" />

                </div>
                <div className="form__field f-body">
                <label className="form__label">Confirm password</label>
                <input
                    onKeyDown={ submitOnEnter }
                    className={ passwordMatchClasses }
                    value={ register.confirmPassword }
                    onChange={ (e) => handleChange("confirmPassword", e.target.value)}
                    type="password" />
                </div>

                <button
                    className="button button__primary"
                    onClick={ handleOnSubmit }
                    >Register
                </button>
            </div>

            <div>
                <Link to="/">
                    Already have an account? Please sign in here
                </Link>
            </div>
        </div>
    );
};

Signup.propTypes = {
    register: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleRegisteringUser: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
};

export default Signup;
