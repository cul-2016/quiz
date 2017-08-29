import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import isEmail from 'validator/lib/isEmail';
import lowerCaseBeforeAt from '../lib/lowerCaseBeforeAt.js';

const Signup = ({ register, updateInputField, registeringUser, toggleTcAgreed, location, showTcAgreedError }) => {

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
            && register.tcAgreed
            && register.password
            && register.username
            && register.password === register.confirmPassword
        ) {
            registeringUser(
                lowerCaseBeforeAt(register.email).trim(),
                register.username,
                register.password,
                is_lecturer
            );
        } else if (!register.tcAgreed) {
            showTcAgreedError();
        }
    };

    return (
        <div className="login">

          <div className="content__body content__body--login">
            <div className="header">
              <h1 className="f-headline f-headline--primary"><img src="/assets/logo/Login_signup_icon.svg"></img></h1>
              <h3 className="f-headline"> Realtime Quizzes for better lectures </h3>
            </div>

            <div className="form">
              <div className="form__field f-body">
                <p className="f-title">Register</p>
                <label className="form__label">Email address</label>
                <input
                  onKeyDown={ submitOnEnter }
                  className="form__input"
                  value={ register.email }
                  onChange={ (e) => updateInputField("email", e.target.value) }
                  type="email" />
                <span className={ invalidEmailClasses }>This email is invalid</span>
              </div>


              <div className="form__field f-body">
                <label className="form__label">Choose a public nickname (for the leaderboard)</label>
                <input
                  onKeyDown={ submitOnEnter }
                  className="form__input"
                  value={ register.username }
                  onChange={ (e) => updateInputField("username", e.target.value)}
                  type="username"/>
              </div>

              <div className="form__field f-body">
                <label className="form__label">Choose a password</label>
                <input
                  onKeyDown={ submitOnEnter }
                  className={ passwordMatchClasses }
                  value={ register.password }
                  onChange={ (e) => updateInputField("password", e.target.value)}
                  type="password" />

              </div>
              <div className="form__field f-body">
                <label className="form__label">Confirm password</label>
                <input
                  onKeyDown={ submitOnEnter }
                  className={ passwordMatchClasses }
                  value={ register.confirmPassword }
                  onChange={ (e) => updateInputField("confirmPassword", e.target.value)}
                  type="password" />
              </div>
              <div className="form__field f-body form__field__tc" >
                  <span
                  className="icon"
                  onClick={ () => toggleTcAgreed() }
                  >
                      <i className={ `fa ${register.tcAgreed ? 'fa-check-square' : 'fa-square'}` }/>
                  </span>
                  <span className="f-body">
                      I agree with the <Link className="f-body f-body--primary" target="_blank" to="/privacy">privacy statement</Link>, including the <Link className="f-body f-body--primary" target="_blank"  to="/privacy">use of cookies.</Link>
                  </span>
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
              </div>
              <button
                className="button button__primary"
                onClick={ handleOnSubmit }
                >Register
              </button>
              <div>
                <p className="f-body">
                  Already have an account?
                  <Link className="login__link f-body f-body--link" to="/"> Please sign in here </Link>
                </p>
              </div>

            </div>

          </div>
        </div>
    );
};

Signup.propTypes = {
    register: PropTypes.object.isRequired,
    updateInputField: PropTypes.func.isRequired,
    registeringUser: PropTypes.func.isRequired,
    toggleTcAgreed: PropTypes.func.isRequired,
    showTcAgreedError: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
};

export default Signup;
