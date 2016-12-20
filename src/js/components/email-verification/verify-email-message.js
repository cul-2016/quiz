import React from 'react';
import { Link } from 'react-router';

const VerficationMessageComponent = () => {
    return (
        <div>
            <p>Thank you for registering</p>
            <p>Please follow the link we provided on your email to activate your account</p>
            <button className="button is-warning">
                <Link to="/">Back to Home</Link>
            </button>
        </div>
    );
};

export default VerficationMessageComponent;
