import React, { PropTypes } from 'react';
import Nav from './general/nav';
import ErrorMessage from './general/error-message';
import TrialExpiryBanner from './general/TrialExpiryBanner';

const App = ({ children, location, username,
               error, isCookieAccepted, handleCookieMessage, //eslint-disable-line no-unused-vars
               handleErrorClearance, is_lecturer, trial_expiry_time, is_super_admin, is_group_admin, paid, loading }) => {

    const checkPath = (path) => {
        return path === '/' || path.includes('/register') || path.includes('reset-password');
    };
    const customClasses = `app ${checkPath(location.pathname) ? 'app--login' : ''}`;
    return (
        <div>
        {
            loading && !error &&
            <div className={ customClasses }>
                <div className="loading__body">
                    <div className="loading">
                        <img className="f-headline" src="/assets/logo/Login_signup_icon.svg" />
                        <p className="f-title">Loading ...</p>
                    </div>
                </div>
            </div>
        }
        {
            !loading && error &&
                <div className={ customClasses }>
                    <Nav location={ location } username={ username } is_lecturer={ is_lecturer } is_super_admin={ is_super_admin } is_group_admin={ is_group_admin } />
                    { children }
                    <ErrorMessage
                        error={ error }
                        handleErrorClearance={ handleErrorClearance }/>
                </div>
        }
        {
            !loading && !error &&
            <div className={ customClasses }>
                <Nav location={ location } username={ username } is_lecturer={ is_lecturer } is_super_admin={ is_super_admin } is_group_admin={ is_group_admin }  />
                <TrialExpiryBanner trial_expiry_time={ trial_expiry_time } location={ location } paid={ paid } />
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
    is_group_admin: PropTypes.bool,
    loading: PropTypes.bool,
    trial_expiry_time: PropTypes.string,
    paid: PropTypes.bool
};

export default App;
