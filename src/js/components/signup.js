import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import isEmail from 'validator/lib/isEmail';

const Signup = ({ register, handleChange, handleRegisteringUser, location }) => {

    const isEmailValid = isEmail(register.email);
    const is_lecturer = location.pathname !== '/register-student';

    const registerButtonClasses = classnames("button button__primary", {
        "is-disabled": !isEmailValid
            || !register.password
            || !register.username
            || register.password !== register.confirmPassword,
        "is-loading": register.isRegistering
    });

    const invalidEmailClasses = classnames("body__warning", {
        "display-none": register.email && isEmailValid
    });

    const passwordMatchClasses = classnames("form__input", {
        "body__warning": register.confirmPassword !== register.password
    });

    const submitOnEnter = (e) => {
        if (e.keyCode === 13 && isEmailValid && register.password && register.username) {
            handleRegisteringUser(register.email, register.username, register.password, is_lecturer);
        }
    };

    return (

        <div className="login">
            <h2 className="headline">
                Register
            </h2>
            { register.error &&
                <div>
                    <span className="body__warning">
                        { register.error }
                    </span>
                </div>
            }

            <div className="form">
                <div className="form__field body">
                    <label className="form__label">Email address</label>
                    <input
                        onKeyDown={ submitOnEnter }
                        className="form__input"
                        value={ register.email }
                        onChange={ (e) => handleChange("email", e.target.value) }
                        type="email" />
                    <div>
                        <span className={ invalidEmailClasses }>This email is invalid</span>
                    </div>
                </div>

                <div className="form__field body">
                    <label className="form__label">Choose a nickname</label>
                    <input
                        onKeyDown={ submitOnEnter }
                        className="form__input"
                        value={ register.username }
                        onChange={ (e) => handleChange("username", e.target.value)}
                        type="username"/>
                </div>

                <div className="form__field body">
                    <label className="form__label">Choose a password</label>
                    <input
                        onKeyDown={ submitOnEnter }
                        className={ passwordMatchClasses }
                        value={ register.password }
                        onChange={ (e) => handleChange("password", e.target.value)}
                        type="password" />
                </div>

                <div className="form__field body">
                    <label className="form__label">Confirm password</label>
                    <input
                        onKeyDown={ submitOnEnter }
                        className={ passwordMatchClasses }
                        value={ register.confirmPassword }
                        onChange={ (e) => handleChange("confirmPassword", e.target.value)}
                        type="password" />
                </div>

                <button className={ registerButtonClasses } onClick={ () => handleRegisteringUser(register.email, register.username, register.password, is_lecturer) }>
                    Register
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
