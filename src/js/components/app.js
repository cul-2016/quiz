import React, { PropTypes } from 'react';
import Nav from './general/nav';
import CookieMessage from './general/cookie-message';
import ErrorMessage from './general/error-message';

const App = ({ children, location, username, error, isCookieAccepted, handleCookieMessage, handleErrorClearance }) => {
    
    return (
        <div>
        {
            error &&
                <div>
                    <Nav location={ location } username={ username } />
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
                    <Nav location={ location } username={ username } />
                    { children }
                </div>
            </div>
        }
        {
            !error && location.pathname === '/' &&
            <div>
                <Nav location={ location } username={ username } />
                { children }
            </div>
        }
        </div>
    );
};

App.propTypes = {
    children: PropTypes.element.isRequired,
    username: PropTypes.string,
    isCookieAccepted: PropTypes.bool,
    error: PropTypes.object,
    handleCookieMessage: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    handleErrorClearance: PropTypes.func.isRequired
};

export default App;
