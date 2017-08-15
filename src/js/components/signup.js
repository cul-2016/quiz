import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import isEmail from 'validator/lib/isEmail';
import lowerCaseBeforeAt from '../lib/lowerCaseBeforeAt.js';

const Signup = ({ register, handleChange, handleRegisteringUser, handleToggleTcAgreed, location }) => {

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

          <div className="content__body">
            <div className="header">
              <h1 className="f-headline f-headline--primary"><img src="/Yellow.svg"></img></h1>
              <h3 className="f-headline"> Realtime Quizzes for better lectures </h3>
            </div>
            {
              register.confirmPassword
              && register.confirmPassword !== register.password
              &&
              <span className="login__err-message"> Passwords are not matching </span>
            }

            <div className="form">
              <div className="form__field f-body">
                <p className="f-title">Register</p>
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
                <label className="form__label">Choose a public nickname (for the leaderboard)</label>
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
              <div className="form__field f-body form__field__tc" >
                  <span
                  className="icon"
                  onClick={ () => handleToggleTcAgreed() }
                  >
                      <i className={ `fa ${register.tcAgreed ? 'fa-check-square' : 'fa-square'}` }/>
                  </span>
                  <span className="f-body">
                      I agree with the <Link className="f-body f-body--primary" target="_blank" to="/privacy">privacy statement</Link>, including the <Link className="f-body f-body--primary" target="_blank"  to="/privacy">use of cookies.</Link>
                  </span>
              </div>

              { register.error &&
                <span className="login__err-message">
                  { register.error }
                </span>
              }

              <button
                className={ `button button__primary ${register.tcAgreed && isEmailValid ? '' : 'button__disabled'}`}
                onClick={ handleOnSubmit }
                >Register
              </button>
              <div>
                <Link className="f-body" to="/">
                  Already have an account? Please sign in here
                </Link>
              </div>

            </div>

          </div>
        </div>
    );
};

Signup.propTypes = {
    register: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleRegisteringUser: PropTypes.func.isRequired,
    handleToggleTcAgreed: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
};

export default Signup;
