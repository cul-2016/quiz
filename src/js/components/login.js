import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Login = ({ signup, handleEmailChange, handlePasswordChange }) => {
    return (
        <div>
            This is the login page.
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

            <Link to='auth'>
                <h3>Login</h3>
            </Link>
        </div>
    );
};

Login.propTypes = {
    signup: PropTypes.object.isRequired,
    handleEmailChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
};

export default Login;
