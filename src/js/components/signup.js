import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import isEmail from 'validator/lib/isEmail';
import lowerCaseBeforeAt from '../lib/lowerCaseBeforeAt.js';

const Signup = ({ register, user, updateInputField, registeringUser, toggleTcAgreed, toggleCookiesAgreed, location, showTcAgreedError, showCookiesAgreedError }) => {

  const isEmailValid = isEmail(register.email);
  const is_lecturer = location.pathname.indexOf('student') === -1;
  const is_moodle = location.pathname.indexOf('moodle') > -1;

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
      && register.cookiesAgreed
      && (register.password)
      && (!register.username && is_lecturer ? true : register.username)
      && (register.password === register.confirmPassword)
    ) {
      registeringUser(
        lowerCaseBeforeAt(register.email).trim(),
        register.username,
        register.password,
        is_lecturer,
        register.group_code,
        location.query.module
      );
    } else if (!register.cookiesAgreed) {
      showCookiesAgreedError();
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
            <p className="f-title">{is_lecturer ? "Lecturer sign-up" : "Student sign-up"}</p>
            <label className="form__label">Email address</label>
            <input
              onKeyDown={submitOnEnter}
              className={"form__input " + (is_moodle ? "disabled" : "")}
              defaultValue={user.email || register.email}
              onChange={(e) => updateInputField("email", e.target.value)}
              type="email"
              disabled={is_moodle}
            />
            <span className={invalidEmailClasses}>This email is invalid</span>
          </div>

          {
            !is_lecturer &&
            <div className="form__field f-body">
              <label className="form__label">Choose a public nickname (for the leaderboard)</label>
              <input
                onKeyDown={submitOnEnter}
                className="form__input"
                value={register.username}
                onChange={(e) => updateInputField("username", e.target.value)}
                type="username" />
            </div>
          }
          {is_lecturer &&
            <div className="form__field f-body">
              <label className="form__label">Code (if your institution has given you one)</label>
              <input
                onKeyDown={submitOnEnter}
                className="form__input"
                value={register.group_code}
                onChange={(e) => updateInputField("group_code", e.target.value)}
                type="code" />
            </div>
          }
          <div>
            <div className="form__field f-body">
              <label className="form__label">Choose a password</label>
              <input
                onKeyDown={submitOnEnter}
                className={passwordMatchClasses}
                value={register.password}
                onChange={(e) => updateInputField("password", e.target.value)}
                type="password" />

            </div>
            <div className="form__field f-body">
              <label className="form__label">Confirm password</label>
              <input
                onKeyDown={submitOnEnter}
                className={passwordMatchClasses}
                value={register.confirmPassword}
                onChange={(e) => updateInputField("confirmPassword", e.target.value)}
                type="password" />
            </div>
          </div>

          <div className="form__field f-body form__field__tc" >
            <div className="f-body">
              <span
                className="icon"
                onClick={() => toggleCookiesAgreed()}
              >
                <i className={`fa ${register.cookiesAgreed ? 'fa-check-square' : 'fa-square'}`} />
                <span className="f-body">
                  I agree to the <Link className="f-body f-body--primary" target="_blank" to="/privacy">use of cookies </Link> for anonymised analytics collection and to keep me logged into the application.
                  </span>
              </span>
            </div>
            <div className="f-body">
              <span
                className="icon"
                onClick={() => toggleTcAgreed()}
              >
                <i className={`fa ${register.tcAgreed ? 'fa-check-square' : 'fa-square'}`} />
              </span>
              <span className="f-body">
                I agree with the <Link className="f-body f-body--primary" target="_blank" to="/privacy">privacy statement</Link>.
                  </span>
            </div>
            {register.mergeUsers &&
              <span className="login__err-message">
                This account already exists. <Link to="/merge-users">Click here</Link> to migrate your account to Moodle?
                    </span>
            }
            {register.error &&
              <span className="login__err-message">
                {register.error}
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
            className="button"
            onClick={handleOnSubmit}
          >Register
                </button>
          <div>
            <p className="f-body">
              Already have an account?
                  <Link className="login__link f-body f-body--link" to={is_moodle ? `/merge-users?module=${location.query.module}` : "/"}> Please sign in here </Link>
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
  toggleCookiesAgreed: PropTypes.func.isRequired,
  showCookiesAgreedError: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

export default Signup;
