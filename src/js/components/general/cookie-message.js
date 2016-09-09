import React, { PropTypes } from 'react';
import classnames from 'classnames';

const CookieMessage = ({ isCookieAccepted, handleCookieMessage }) => {

    const cookieDivClasses = classnames({
        "display-none": !isCookieAccepted
    });

    return (
        <div className={ cookieDivClasses }>
            <section className="hero is-warning">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <p>
                            This app relies on cookies to work. Please make sure you have cookies enabled.
                        </p>
                        <button onClick={ handleCookieMessage } className="button has-text-centered"><i className="fa fa-times" /></button>
                    </div>
                </div>
            </section>
        </div>
    );
};

CookieMessage.propTypes = {
    isCookieAccepted: PropTypes.bool,
    handleCookieMessage: PropTypes.func.isRequired
};

export default CookieMessage;
