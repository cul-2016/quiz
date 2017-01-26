import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import isEmail from 'validator/lib/isEmail';

const Login = ({ login, handleEmailChange, handlePasswordChange, handleAuthenticateUser }) => {

    const submitOnEnter = (e) => {
        if (e.keyCode === 13 && isEmail(login.email) && login.password.length !== 0) {
            handleAuthenticateUser(login.email, login.password);
        }
    };

    const handleOnSubmit = () => {
        if (isEmail(login.email) && login.password.length !== 0) {
            handleAuthenticateUser(login.email, login.password);
        }
    };

    return (
        <div className="login">
            <h1 className="headline"><img src="/Yellow.svg"></img></h1>
            <h3 className="subheader"> Realtime Quizzes for better lectures </h3>

            <form className="form">
                <div className="form__field body">
                    <label className="form__label">Email / Username</label>
                    <input
                        onKeyDown={ submitOnEnter }
                        onChange={ (e) => handleEmailChange(e.target.value) }
                        className="form__input"
                        type="text"
                    ></input>
                </div>
                <div className="form__field body">
                    <label className="form__label">Password</label>
                    <input
                        onKeyDown={ submitOnEnter }
                        onChange={ (e) => handlePasswordChange(e.target.value) }
                        className="form__input"
                        type="password"
                    ></input>
                </div>
                <div className={ login.userIsAuthenticated ? 'display-none' : 'body__warning' }>
                    { login.message }
                </div>
                <button onClick={ handleOnSubmit } className="button button__primary">
                    <p className="subheader">Log in</p>
                </button>
            </form>

            <p className="body body__secondary body__secondary--dark"> Don't have an Account? </p>
            <div> <Link className="subheader" to="/register-student"> Sign Up </Link> </div>

            <div> <Link className="subheader" to="/request-reset-password"> Forgotten Password </Link> </div>
        </div>
    );
};

Login.propTypes = {
    login: PropTypes.object.isRequired,
    handleEmailChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    handleAuthenticateUser: PropTypes.func.isRequired
};

export default Login;
