import React from 'react';
import { Link } from 'react-router';

const VerficationMessageComponent = () => {
    return (
        <div>
            <p>Thank you for registering</p>
            <p>Please follow the link we provided on your email to activate your account</p>
            <Link to="/" className="button is-warning">Back to Home</Link>
        </div>
    );
};

export default VerficationMessageComponent;
