import React, { PropTypes } from 'react';
import CookieMessage from './general/cookie-message';
import ErrorMessage from './general/error-message';

const App = ({ children, location, error, cookieMessage, handleCookiePopup, handleErrorClearance }) => {

    return (
        <div>
        {
            error &&
                <div>
                    { children }
                    <ErrorMessage
                    error={ error }
                    handleErrorClearance={ handleErrorClearance }/>
                </div>
        }
        {
            !error && location.pathname !== '/' &&
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
            !error && location.pathname === '/' &&
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
    error: PropTypes.object,
    handleCookiePopup: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    handleErrorClearance: PropTypes.func.isRequired
};

export default App;
