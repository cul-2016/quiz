import React, { PropTypes } from 'react';
import classnames from 'classnames';


const CookieMessage = ({ isCookieAccepted, handleCookieMessage }) => {

    const cookieDivClasses = classnames("cookie-message", {
        "display-none": !isCookieAccepted
    });

    return (
        <div className={ cookieDivClasses }>
            <div className="notification is-warning has-text-centered">
                <button className="delete" onClick={ handleCookieMessage } />
                This app relies on cookies to work. Please make sure you have cookies enabled.
            </div>
        </div>
    );
};

CookieMessage.propTypes = {
    isCookieAccepted: PropTypes.bool,
    handleCookieMessage: PropTypes.func.isRequired
};

export default CookieMessage;
