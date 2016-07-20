import React, { PropTypes } from 'react';
import classnames from 'classnames';

const RegisterUser = ({ register, handleChange, handleRegisteringUser, location }) => {

    let is_lecturer;
    if (location.pathname === '/register-student') {
        is_lecturer = false;
    } else {
        is_lecturer = true;
    }

    let userExists = classnames({
        "display-none": register.userExists !== true
    });


    return (
        <div>
            Register page.
            <p className={ userExists }> The email already exists please sign in</p>
            <input
                value={ register.email }
                onChange={ (e) => handleChange("email", e.target.value) }
                type="email"
                placeholder="Email"
            />
            <input
                value={ register.username }
                onChange={ (e) => handleChange("username", e.target.value)}
                type="username"
                placeholder="Username"
            />
            <input
                value={ register.password }
                onChange={ (e) => handleChange("password", e.target.value)}
                type="password"
                placeholder="Password"
            />


        <h3 onClick={ () => handleRegisteringUser(register.email, register.username, register.password, is_lecturer) }>
            Register
        </h3>

        </div>
    );
};

RegisterUser.propTypes = {
    register: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleRegisteringUser: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
};

export default RegisterUser;
