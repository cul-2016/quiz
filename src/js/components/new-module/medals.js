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

                <h3 className="f-body f-body--light">
                    Medals
                </h3>

                <div className="medal-values">
                    <div className="medal-values--bronze">
                        <div className="medal-values--header">
                          <p className="medal-small medal-small--bronze"></p>
                          <p className="f-small-body f-small-body--light">Bronze</p>
                        </div>
                        <span className="f-body f-body--light">0 to </span>
                        <input
                            className="form__input form__input--medal"
                            name="bronze"
                            type="number"
                            min="1" max="96"
                            defaultValue={ this.props.applyOffset(this.props.medals[0], -1) }
                            onChange={ (e) => this.props.updateMedalVals('bronze', e.target.value) } />
                    </div>
                    <div className="medal-values--silver">
                        <div className="medal-values--header">
                          <p className="medal-small medal-small--silver"></p>
                          <p className="f-small-body f-small-body--light">Silver</p>
                        </div>
                        <p className="f-body f-body--light">{ `${this.props.medals[0]} to ${this.props.medals[1]} %` }</p>
                    </div>
                    <div className="medal-values--gold">
                        <div className="medal-values--header">
                          <p className="medal-small medal-small--gold"></p>
                          <p className="f-small-body f-small-body--light">Gold</p>
                        </div>
                        <input
                            className="form__input form__input--medal"
                            name="gold"
                            type="number"
                            min="4" max="99"
                            defaultValue={ this.props.applyOffset(this.props.medals[1], 1) }
                            onChange={ (e) => this.props.updateMedalVals('gold', e.target.value) } />
                          <span className="f-body f-body--light"> to 100</span>

                    </div>
                </div>
                <div className={ toggleClassnamesMedals }>
                    <p>
                        { text.medals }
                    </p>
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
