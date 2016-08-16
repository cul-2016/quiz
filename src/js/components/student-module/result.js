import React, { PropTypes } from 'react';
import { Motion, spring } from 'react-motion';

class Result extends React.Component  {
    constructor (props) {
        super(props);
    }

    render () {

        return (
            <div className="result hero is-info is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <Motion defaultStyle={{ x: 0 }} style={{ x: spring(this.props.score) }}>
                            {
                                val => <h1 className="title score">
                                          { Math.floor(val.x) }
                                       </h1>
                            }
                        </Motion>
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
