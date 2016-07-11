import React, { PropTypes } from 'react';

const AppContainer = ({ children }) => {

    return (
        <div>
            { children }
        </div>
    );
};

AppContainer.propTypes = {
    children: PropTypes.object.isRequired
};

export default AppContainer;
