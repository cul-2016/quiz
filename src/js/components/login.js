import React from 'react';
import { Link } from 'react-router';

const Login = () => {
    return (
        <div>
            This is the login page.
            <Link to='auth'>
                <h3>Login</h3>
            </Link>
        </div>
    );
};

export default Login;
