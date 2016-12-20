import React from 'react';
import { Link } from 'react-router';

const VerifiedComponent = () => {
    return (
        <div>
            <p>We have sent you an email</p>
            <p>with a link to reset your password.</p>
            <button className="button is-warning">
                <Link to="/">Log In</Link>
            </button>
        </div>
    );
};

export default VerifiedComponent;
