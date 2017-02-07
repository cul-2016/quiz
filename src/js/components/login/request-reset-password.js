import React, { PropTypes } from 'react';
import classnames from 'classnames';

const ResetPassword = ({ resetPassword, handleEmailChange, handleResetPassword }) => {

    let isEmailValid = /.+@.+\..+/.test(resetPassword.email);
    let isEmailEmpty = resetPassword.email.length === 0;

    let submitButtonClasses = classnames("button button__primary", {
        "is-loading": resetPassword.isRequesting === true,
        "is-disabled": !isEmailValid
    });

    let invalidEmailClasses = classnames("f-body--warning", {
        "display-none": isEmailEmpty || isEmailValid
    });

    let errorMessageClass = classnames("help is-danger", {
        "display-none": !resetPassword.error
    });

    const submitOnEnter = (e) => {
        if (e.keyCode === 13 && isEmailValid && !isEmailEmpty) {
            handleResetPassword(resetPassword.email);
        }
    };

    return (
        <section className="login">
            <div className="content__body">
              <div className="header">
                  <h1 className="f-headline"><img src="/Yellow.svg"></img></h1>
                  <h3 className="f-headline"> Realtime Quizzes for better lectures </h3>
              </div>
              <div className="form">

                <div className="form__field f-body">
                  <p className="f-title">Request Password Reset</p>
                  <span className={ errorMessageClass }>{ resetPassword.error }</span>
                  <label className="form__label">Email</label>
                  <input
                    onKeyDown={ submitOnEnter }
                    className="form__input"
                    value={ resetPassword.email }
                    onChange={ e => handleEmailChange(e.target.value) }
                    type="email" />
                </div>
                <div className={ invalidEmailClasses }>
                  Invalid Email Address
                </div>
                <button className={ submitButtonClasses }
                        onClick={ () => { handleResetPassword(resetPassword.email); } }>
                    Send Email
                </button>
                  </div>
            </div>
        </section>
    );
};

ResetPassword.propTypes = {
    resetPassword: PropTypes.object.isRequired,
    handleEmailChange: PropTypes.func.isRequired,
    handleResetPassword: PropTypes.func.isRequired
};

export default ResetPassword;
