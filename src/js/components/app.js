import React, { PropTypes } from 'react';
import Nav from './general/nav';
import ErrorMessage from './general/error-message';

const App = ({ children, location, username,
               error, isCookieAccepted, handleCookieMessage, //eslint-disable-line no-unused-vars
               handleErrorClearance, is_lecturer }) => {

    return (
        <div>
        {
            error &&
                <div>
                    <Nav location={ location } username={ username } is_lecturer={ is_lecturer }  />
                    { children }
                    <ErrorMessage
                        error={ error }
                        handleErrorClearance={ handleErrorClearance }/>
                </div>
        }
        {
            !error &&
            <div style={{ position: 'fixed', width: '100%' }}>
                <Nav location={ location } username={ username } is_lecturer={ is_lecturer }  />
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
    handleErrorClearance: PropTypes.func.isRequired,
    is_lecturer: PropTypes.bool
};

export default App;
