import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import isEmail from 'validator/lib/isEmail';

const Signup = ({ register, handleChange, handleRegisteringUser, location }) => {

    const isEmailValid = isEmail(register.email);
    const is_lecturer = location.pathname !== '/register-student'

    const submitOnEnter = (e) => {
        if (e.keyCode === 13 && isEmailValid && register.password && register.username) {
            handleRegisteringUser(register.email, register.username, register.password, is_lecturer);
        }
    };

    return (
        <div className="login">
            <h2 className="headline"> Register </h2>
            { register.error &&
                <span className={ "body__warning" + !isEmailValid && register.email ? '' : ' display-none' }>
                    { register.error }
                </span>
            }
            <form className="form">
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
                        onChange={ (e) => handleChange("password", e.target.value)}
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
                    className="button button__primary"
                    onClick={ () => handleRegisteringUser(register.email, register.username, register.password, is_lecturer) }
                > Register </button>

            </form>
    
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
