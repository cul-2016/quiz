import React, { PropTypes } from 'react';
import classnames from 'classnames';

const ResetPassword = ({ resetPassword, handleEmailChange, handleResetPassword }) => {

    let isEmailValid = /.+@.+\..+/.test(resetPassword.email);
    let isEmailEmpty = resetPassword.email.length === 0;

    let submitButtonClasses = classnames("button is-warning", {
        "is-loading": resetPassword.isRequesting === true,
        "is-disabled": !isEmailValid
    });

    let invalidEmailClasses = classnames("help is-danger", {
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
        <section className="login outer blue-hero">
            <div className="middle">
                <div className="container inner has-text-centered">
                    <div className="box">
                        <h2>Request Password Reset</h2>
                        <span className={ errorMessageClass }>{ resetPassword.error }</span>

                        <label className="label has-text-left">Email</label>
                        <input
                            onKeyDown={ submitOnEnter }
                            className="input"
                            value={ resetPassword.email }
                            onChange={ e => handleEmailChange(e.target.value) }
                            type="email" />
                        <span className={ invalidEmailClasses }>This email is invalid</span>

                        <button className={ submitButtonClasses }
                                onClick={ () => { handleResetPassword(resetPassword.email); } }>
                            Send Email
                        </button>
                    </div>
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
