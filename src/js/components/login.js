import React, { PropTypes } from 'react';
import classnames from 'classnames';


const Login = ({ login, handleEmailChange, handlePasswordChange, handleAuthenticateUser }) => {

    let userValidation = classnames({
        "display-none": login.userIsAuthenticated !== false
    });

    return (
        <div>
            This is the login page.
            <p className={ userValidation }> Please enter a valid email and password</p>
            <input
                value={ login.username }
                onChange={ (e) => handleEmailChange(e.target.value)}
                type="email"
                placeholder="Email"
            />
            <input
                value={ login.password }
                onChange={ (e) => handlePasswordChange(e.target.value)}
                type="password"
                placeholder="Password"
            />


        <button onClick={ () => handleAuthenticateUser(login.email, login.password) }>
            Login
        </button>

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
