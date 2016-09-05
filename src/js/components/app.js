import React, { PropTypes } from 'react';
import CookieMessage from './general/cookie-message';

const App = ({ children, location, cookieMessage, handleCookiePopup }) => {

    return (
        <div>
        {
            location.pathname !== '/' &&
            <div>
                <CookieMessage
                    cookieMessage={ cookieMessage }
                    handleCookiePopup={ handleCookiePopup } />
                <div>
                    { children }
                </div>
            </div>
        }
        {
            location.pathname === '/' &&
            <div>
                { children }
            </div>
        }
        </div>
    );
};

App.propTypes = {
    children: PropTypes.element.isRequired,
    cookieMessage: PropTypes.bool,
    handleCookiePopup: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
};

export default App;
