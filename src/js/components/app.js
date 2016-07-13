import React, { PropTypes } from 'react';

const App = ({ children }) => {

    return (
        <div>
            { children }
        </div>
    );
};

App.propTypes = {
    children: PropTypes.element.isRequired
};

export default App;
