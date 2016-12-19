import React from 'react';
import { Link } from 'react-router';

const VerificationErrorComponent = () => {
    return (
        <div>
            <p>Sorry, it looks like you have already verified before.</p>
            <button className="button is-warning">
                <Link to="/">Log In</Link>
            </button>
        </div>
    );
};

export default VerificationErrorComponent;
