import React, { PropTypes } from 'react';
import { Motion, spring, presets } from 'react-motion'; //eslint-disable-line no-unused-vars

class Result extends React.Component  {
    constructor (props) {
        super(props);
    }

    render () {

        return (
            <div className="result hero is-info is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h2 className="subtitle">Your score is...</h2>
                        <h1 className="title score animated bounceInUp">
                            { this.props.score }
                        </h1>
                    </div>
                </div>
            </div>
        );
    }
}

Result.propTypes = {
    score: PropTypes.number.isRequired
};

export default Result;
