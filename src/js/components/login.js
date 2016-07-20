import React, { PropTypes } from 'react';
import classnames from 'classnames';


const Login = ({ signup, handleEmailChange, handlePasswordChange, handleAuthenticateUser }) => {

    let userValidation = classnames({
        "display-none": signup.userIsAuthenticated !== false
    });

    return (
        <div>
            This is the login page.
            <p className={ userValidation }> Please enter a valid email and password</p>
            <input
                value={ signup.username }
                onChange={ (e) => handleEmailChange(e.target.value)}
                type="email"
                placeholder="Email"
            />
            <input
                value={ signup.password }
                onChange={ (e) => handlePasswordChange(e.target.value)}
                type="password"
                placeholder="Password"
            />


        <h3 onClick={ () => handleAuthenticateUser(signup.email, signup.password) }>
            Login
        </h3>

        </div>
    );
};

Login.propTypes = {
    signup: PropTypes.object.isRequired,
    handleEmailChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    handleAuthenticateUser: PropTypes.func.isRequired
};

export default Login;
