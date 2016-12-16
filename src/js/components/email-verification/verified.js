import React from 'react';
import { Link } from 'react-router';

const VerifiedComponent = () => {
    return (
        <div>
            <p>Thank you for verifying</p>
            <button className="button is-warning">
                <Link to="/">Log In</Link>
            </button>
        </div>
    );
};

export default VerifiedComponent;
