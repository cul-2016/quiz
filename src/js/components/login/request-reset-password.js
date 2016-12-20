import React, { PropTypes } from 'react';
import classnames from 'classnames';

const ResetPassword = ({ resetPassword, handleEmailChange }) => {

    let isEmailValid = /.+@.+\..+/.test(resetPassword.email);

    let submitButtonClasses = classnames("button is-warning", {
        "is-disabled": !isEmailValid
    });

    let invalidEmailClasses = classnames("help is-danger", {
        "display-none": resetPassword.email.length === 0 || isEmailValid
    });

    return (
        <section className="login outer blue-hero">
            <div className="middle">
                <div className="container inner has-text-centered">
                    <div className="box" onKeyDown={ () => {}
                        //(e) => {
                        //if (e.keyCode === 13 && isEmailValid && resetPassword.password.length !== 0) {  }
                        //}
                    }>
                        <h2>Request Password Reset</h2>
                        <label className="label has-text-left">Email</label>
                        <input
                            className="input"
                            value={ resetPassword.email }
                            onChange={ e => handleEmailChange(e.target.value) }
                            type="email" />
                        <span className={ invalidEmailClasses }>This email is invalid</span>

                        <button className={ submitButtonClasses }
                                onClick={ () => {} }>
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
    handleEmailChange: PropTypes.func.isRequired
};

export default ResetPassword;
