import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import isEmail from 'validator/lib/isEmail';
import lowerCaseBeforeAt from '../lib/lowerCaseBeforeAt.js';

const Signup = ({ register, updateInputField, registeringUser, toggleTcAgreed, location, showTcAgreedError }) => {

    const isEmailValid = isEmail(register.email);
    const is_lecturer = location.pathname !== '/register-moodle-student';

    let invalidEmailClasses = classnames("help is-danger", {
        "display-none": register.email.length === 0 || isEmailValid
    });

    const submitOnEnter = (e) => {
        if (e.keyCode === 13) {
            handleOnSubmit();
        }
    };

    const handleOnSubmit = () => {
        if (isEmailValid
            && register.tcAgreed
            && (!register.username && is_lecturer ? true : register.username)
        ) {
            registeringUser(
                lowerCaseBeforeAt(register.email).trim(),
                register.username,
                "",
                is_lecturer,
                register.group_code,
                location.query.module
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

              {
                  !is_lecturer &&
                  <div className="form__field f-body">
                    <label className="form__label">Choose a public nickname (for the leaderboard)</label>
                    <input
                      onKeyDown={ submitOnEnter }
                      className="form__input"
                      value={ register.username }
                      onChange={ (e) => updateInputField("username", e.target.value)}
                      type="username"/>
                  </div>
              }
              { is_lecturer &&
                  <div className="form__field f-body">
                    <label className="form__label">Code (if your institution has given you one)</label>
                    <input
                      onKeyDown={ submitOnEnter }
                      className="form__input"
                      value={ register.group_code }
                      onChange={ (e) => updateInputField("group_code", e.target.value)}
                      type="code"/>
                  </div>
              }

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
              </div>
              <button
                className="button"
                onClick={ handleOnSubmit }
                >Register
              </button>

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
