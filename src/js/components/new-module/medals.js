import React, { PropTypes } from 'react';
import classnames from 'classnames';
import text from '../../lib/newModuleRollovers.json';

class Medals extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            medals: false,
        };
    }

    toggleRollover (text) {
        this.setState({
            [text]: !this.state[text]
        });
    }

    render () {

        const toggleClassnamesMedals = classnames("notification container average is-info has-text-centered ", {
            "display-none": !this.state.medals
        });

        return (
            <div className="new-module-medals section column">

                <h3 className="module-section-headers">
                    <i className="fa fa-shield" /> Medals
                </h3>
                <i onClick={ () => { this.toggleRollover("medals");} } className="fa fa-question-circle help-icon" />

                <div className={ toggleClassnamesMedals }>
                    <p>
                        { text.medals }
                    </p>
                </div>

                <div className="columns">
                    <div className="column box has-text-centered">
                        <label className="label">Bronze</label>
                        <span className="label-inline">0 to </span>
                        <input
                            className="input"
                            name="bronze"
                            type="number"
                            min="1" max="96"
                            defaultValue={ this.props.applyOffset(this.props.medals[0], -1) }
                            onChange={ (e) => this.props.updateMedalVals('bronze', e.target.value) } />
                        <span className="label-inline">%</span>
                    </div>
                </div>

                <div className="columns">
                    <div className="column box has-text-centered">
                        <label className="label">Silver</label>
                        <span className="inline">{ `${this.props.medals[0]} to ${this.props.medals[1]} %` }</span>
                    </div>
                </div>

                <div className="columns">
                    <div className="column box has-text-centered">
                        <label className="label">Gold</label>
                        <input
                            className="input"
                            name="gold"
                            type="number"
                            min="4" max="99"
                            defaultValue={ this.props.applyOffset(this.props.medals[1], 1) }
                            onChange={ (e) => this.props.updateMedalVals('gold', e.target.value) } />
                        <span className="label-inline"> to 100%</span>
                    </div>
                </div>

            </div>
        );
    }
}

Medals.propTypes = {
    applyOffset: PropTypes.func.isRequired,
    updateMedalVals: PropTypes.func.isRequired,
    medals: PropTypes.array.isRequired
};

export default Medals;
