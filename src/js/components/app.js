import React, { PropTypes } from 'react';
import CookieMessage from './general/cookie-message';
import ErrorMessage from './general/error-message';

const App = ({ children, location, error, isCookieAccepted, handleCookieMessage, handleErrorClearance }) => {

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
                    isCookieAccepted={ isCookieAccepted }
                    handleCookieMessage={ handleCookieMessage } />
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
    isCookieAccepted: PropTypes.bool,
    error: PropTypes.object,
    handleCookieMessage: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    handleErrorClearance: PropTypes.func.isRequired
};

export default App;
