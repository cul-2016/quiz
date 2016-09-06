import React, { PropTypes } from 'react';
import classnames from 'classnames';

const CookieMessage = ({ isCookieAccepted, handleCookiePopup }) => {

    const cookieDivClasses = classnames({
        "display-none": !isCookieAccepted
    });

    return (
        <div className={ cookieDivClasses }>
            <section className="hero is-warning">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <p>
                            We use cookies to ensure that we give you the best experience on our website.
                        </p>
                        <button onClick={ handleCookiePopup } className="button has-text-centered"><i className="fa fa-times" /></button>
                    </div>
                </div>
            </section>
        </div>
    );
};

CookieMessage.propTypes = {
    isCookieAccepted: PropTypes.bool,
    handleCookiePopup: PropTypes.func.isRequired
};

export default CookieMessage;
