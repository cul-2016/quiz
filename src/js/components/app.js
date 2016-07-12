import React, { PropTypes } from 'react';

const App = ({ children }) => {

    return (
        <div>
            { children }
        </div>
    );
};

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;
