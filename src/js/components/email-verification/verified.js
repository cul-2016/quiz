import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const VerifiedComponent = ({ params }) => {
    const isVerified = (params.verified === "true");
    return (
        <div>
            {
                isVerified ?
                <p>Thank you for verifying</p> :
                <p>Sorry, it looks like you have already verified before.</p>
            }
            <Link className="button is-warning" to="/">Log In</Link>
        </div>
    );
};

VerifiedComponent.propTypes = {
    params: PropTypes.object
};

export default VerifiedComponent;
