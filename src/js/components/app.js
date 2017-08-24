import React, { PropTypes } from 'react';
import Nav from './general/nav';
import ErrorMessage from './general/error-message';

const App = ({ children, location, username,
               error, isCookieAccepted, handleCookieMessage, //eslint-disable-line no-unused-vars
               handleErrorClearance, is_lecturer, is_super_admin, loading }) => {
                 console.log(location.pathname);
    const customClasses = `app ${location.pathname === '/' ? 'app--login' : ''}`;
    console.log(customClasses);
    return (
        <div>
        {
            loading && !error &&
            <div className={ customClasses }>
                <div className="content__body">
                    <div className="loading">
                        <img className="f-headline" src="/Yellow.svg" />
                        <p className="f-title">Loading ...</p>
                    </div>
                </div>
            </div>
        }
        {
            !loading && error &&
                <div>
                    <Nav location={ location } username={ username } is_lecturer={ is_lecturer } is_super_admin={ is_super_admin } />
                    { children }
                    <ErrorMessage
                        error={ error }
                        handleErrorClearance={ handleErrorClearance }/>
                </div>
        }
        {
            !loading && !error &&
            <div className={ customClasses }>
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
    is_super_admin: PropTypes.bool,
    loading: PropTypes.bool
};

export default App;
