import React, { PropTypes } from 'react';

const Result = ({ score }) => {

    return (
        <div>
            { score }
        </div>
    );
};

Result.propTypes = {
    score: PropTypes.number
};

export default Result;
