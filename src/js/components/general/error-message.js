import React, { PropTypes } from 'react';
import logout from '../../lib/logout';

const ErrorMessage = ({ error, handleErrorClearance }) => {

    console.log(error.response.data);
    console.log(error && error.response && error.response.data && error.response.data.statusCode === 401);

    if (error && error.response && error.response.data && error.response.data.statusCode === 401) {
        console.log('logged out called???')
        logout();
    }

    return (
        <div>
            <div className="error-message">
                <span className="tag is-danger">
                    Whoops! something went wrong in { error.reducerState } { error.status }
                    <button onClick={ () => handleErrorClearance(error.reducerState) } className="delete"></button>
                </span>
            </div>
        </div>
    );
};

ErrorMessage.propTypes = {
    error: PropTypes.object.isRequired,
    handleErrorClearance: PropTypes.func.isRequired
};

export default ErrorMessage;
