import React from 'react';
import { Link } from 'react-router';

const VerifiedComponent = () => {
    return (
        <div className="login">


            <div className="content__body content__body--login">
              <div className="header">
                  <h1 className="f-headline"><img src="/Yellow.svg"></img></h1>
                  <h3 className="f-headline"> We have sent you an email <br /> with a link to reset your password.</h3>
                  <Link className="button button__primary" to="/">
                    <p className="f-subheader">Log in</p>
                  </Link>
              </div>
            </div>

        </div>
    );
};

export default VerifiedComponent;
