import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const VerifiedComponent = ({ params }) => {
    const isVerified = (params.verified === "true");
    return (
        <div className="login">
            <div className="content__body">
              <div className="header">
                  <h1 className="f-headline"><img src="/assets/logo/Login_signup_icon.svg"></img></h1>
                  {
                    isVerified ?
                    <h3 className="f-headline">Thank you for verifying</h3> :
                    <h3 className="f-headline">Sorry, it looks like you have already verified before.</h3>
                  }
                  <Link className="button button__primary" to="/">
                    <p className="f-subheader">Log in</p>
                  </Link>
              </div>
            </div>

        </div>
    );
};

VerifiedComponent.propTypes = {
    params: PropTypes.object
};

export default VerifiedComponent;
