import React, { PropTypes } from 'react';

const Result = ({ score }) => {

    return (
        <div className="result hero is-info is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <h1 className="title score">
                        { score }
                    </h1>
                </div>
            </div>
        </div>
    );
};

Result.propTypes = {
    score: PropTypes.number
};

export default Result;
