import React, { PropTypes } from 'react';
import Nav from './general/nav';
import ErrorMessage from './general/error-message';

const App = ({ children, location, username,
               error, isCookieAccepted, handleCookieMessage, //eslint-disable-line no-unused-vars
               handleErrorClearance, is_lecturer, is_super_admin }) => {

    return (
        <div>
        {
            error &&
                <div>
                    <Nav location={ location } username={ username } is_lecturer={ is_lecturer } is_super_admin={ is_super_admin } />
                    { children }
                    <ErrorMessage
                        error={ error }
                        handleErrorClearance={ handleErrorClearance }/>
                </div>
        }
        {
            !error &&
            <div>
                <Nav location={ location } username={ username } is_lecturer={ is_lecturer } is_super_admin={ is_super_admin }  />
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
    is_lecturer: PropTypes.bool,
    is_super_admin: PropTypes.bool
};

export default App;
