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
    const { password, confirmedPassword, isRequesting } = resetPassword;
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

    return (
        <section className="login outer blue-hero">
            <div className="middle">
                <div className="container inner has-text-centered">
                    <div className="box" onKeyDown={ (e) => {
                        if (e.keyCode === 13 && doPasswordsMatch) {
                            handleSubmitNewPassword(password, code);
                        }
                    }}>
                        <h2>Reset Password</h2>
                        <label className="label has-text-left">Password</label>
                        <input
                            className={passwordMatchClasses}
                            value={ password }
                            onChange={ (e) => handlePasswordChange(e.target.value) }
                            type="password" />
                        <label className="label has-text-left">Confirm Password</label>
                        <input
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
