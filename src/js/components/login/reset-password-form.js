import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

const ResetPasswordForm = ({
    params,
    resetPassword,
    handlePasswordChange,
    handleConfirmedPasswordChange,
    handleSubmitNewPassword
}) => {
    const { password, confirmedPassword, isRequesting, error } = resetPassword;
    const { code } = params;
    let doPasswordsMatch = (password === confirmedPassword);
    let passwordsEmpty = password.length === 0 || confirmedPassword.length === 0;

    let submitButtonClasses = classnames("button", {
        "is-loading": isRequesting === true,
        "button__disabled": !doPasswordsMatch || passwordsEmpty,
        "button__primary": doPasswordsMatch && !passwordsEmpty
    });

    let passwordMatchClasses = classnames("form__input", {
        "form__input--is-success": doPasswordsMatch && !passwordsEmpty,
        "form__input--is-danger": !doPasswordsMatch && !passwordsEmpty
    });

    let errorMessageClass = classnames("help is-danger", {
        "display-none": !error
    });

    const submitOnEnter = (e) => {
        if (e.keyCode === 13 && doPasswordsMatch) {
            handleSubmitNewPassword(password, code);
        }
    };

    return (
        <section className="login">
            <div className="content__body content__body--login">

              <div className="header">
                <h1 className="f-headline f-headline--primary"><img src="/assets/logo/Login_signup_icon.svg"></img></h1>
                <h3 className="f-headline"> Realtime Quizzes for better lectures </h3>
              </div>
                <div className="form">
                    <div className="form__field f-body">
                        <h2 className="f-title">Reset Password</h2>
                        <span className={ errorMessageClass }>{ error }</span>
                        <label className="form__label">Password</label>
                        <input
                            onKeyDown={ submitOnEnter }
                            className={passwordMatchClasses}
                            value={ password }
                            onChange={ (e) => handlePasswordChange(e.target.value) }
                            type="password" />
                          <label className="form__label">Confirm Password</label>
                        <input
                            onKeyDown={ submitOnEnter }
                            className={passwordMatchClasses}
                            value={ confirmedPassword }
                            onChange={ (e) => handleConfirmedPasswordChange(e.target.value) }
                            type="password" />

                        <button className={ submitButtonClasses }
                                onClick={ () => handleSubmitNewPassword(password, code) }>
                            Submit
                        </button>
                        <p className="f-body f-body--dark"> Already have an Account? </p>
                        <div> <Link className="f-body" to="/register-student"> Sign Up </Link> </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

ResetPasswordForm.propTypes = {
    params: PropTypes.object.isRequired,
    resetPassword: PropTypes.object.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    handleConfirmedPasswordChange: PropTypes.func.isRequired,
    handleSubmitNewPassword: PropTypes.func.isRequired
};

export default ResetPasswordForm;
