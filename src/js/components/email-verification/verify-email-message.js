import React from 'react';
import { Link } from 'react-router';

const VerficationMessageComponent = () => {
    return (
        <div className="login">
            <div className="content__body">
              <div className="header">
                  <h1 className="f-headline"><img src="/assets/logo/Login_signup_icon.svg"></img></h1>
                  <h3 className="f-headline"> Thank you for registering. Please follow the link we provided on your email to activate your account</h3>
                  <Link className="button button__primary" to="/">
                    <p className="f-subheader">Log in</p>
                  </Link>
              </div>
            </div>

        </div>
    );
};

export default VerficationMessageComponent;
