import React, { PropTypes } from 'react';
import classnames from 'classnames';

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

    let submitButtonClasses = classnames("button is-warning", {
        "is-loading": isRequesting === true,
        "is-disabled": !doPasswordsMatch || passwordsEmpty
    });

    let passwordMatchClasses = classnames("input", {
        "is-success": doPasswordsMatch && !passwordsEmpty,
        "is-danger": !doPasswordsMatch && !passwordsEmpty
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
        <section className="login outer blue-hero">
            <div className="middle">
                <div className="container inner has-text-centered">
                    <div className="box">
                        <h2>Reset Password</h2>
                        <span className={ errorMessageClass }>{ error }</span>
                        <label className="f-label has-text-left">Password</label>
                        <input
                            onKeyDown={ submitOnEnter }
                            className={passwordMatchClasses}
                            value={ password }
                            onChange={ (e) => handlePasswordChange(e.target.value) }
                            type="password" />
                        <label className="f-label has-text-left">Confirm Password</label>
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
