import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import isEmail from 'validator/lib/isEmail';

const Signup = ({ register, handleChange, handleRegisteringUser, location }) => {

    const isEmailValid = isEmail(register.email);
    const is_lecturer = location.pathname !== '/register-student';
    const registerButtonEnabled = isEmailValid
        && register.password
        && register.username
        && register.password === register.confirmPassword;
    const buttonClass = classnames("button button__primary", {
        'button__is-disabled': !registerButtonEnabled
    });
    const errorClass = classnames("body__warning", {
        'display-none': (
            !isEmailValid
            && register.email
        ) || (
            register.password
            && register.password !== register.confirmPassword
        )
    });

    const submitOnEnter = (e) => {
        if (e.keyCode === 13 && registerButtonEnabled) {
            handleRegisteringUser(register.email, register.username, register.password, is_lecturer);
        }
    };

    return (
        <div className="login">
            <h2 className="headline"> Register </h2>
            { /*register.error*/ true &&
                  <span className={ errorClass }>
                      { register.error + register.password }
                  </span>
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
                        className="form__input"
                        value={ register.password }
                        onChange={ (e) => handleChange("password", e.target.value) }
                        type="password" />
                </div>
        
                <div className="form__field body">
                    <label className="form__label">Confirm password</label>
                    <input
                        onKeyDown={ submitOnEnter }
                        className="form__input"
                        value={ register.confirmPassword }
                        onChange={ (e) => handleChange("confirmPassword", e.target.value)}
                        type="password" />
                </div>
        
                <button
                    className={ buttonClass }
                    onClick={
                        () => handleRegisteringUser(register.email, register.username, register.password, is_lecturer)
                    }
                > Register </button>

            </div>
    
            <div className="body">
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
