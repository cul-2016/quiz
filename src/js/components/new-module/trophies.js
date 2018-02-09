import React, { PropTypes } from 'react';
import classnames from 'classnames';
import normaliseText from '../../lib/normaliseText';
import text from '../../lib/newModuleRollovers.json';

class Trophies extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            trophies: false,
            participation: false,
            overall_score: false,
            high_score: false,
            first_quiz: false,
            trophyUnits: ["Number of quizzes taken", "Total score across all quizzes", "Percent correct on any one quiz", "Number of quizzes taken"],
            trophies_disabled: false,
        };
        this.toggleTrophies = this.toggleTrophies.bind(this);
    }

    toggleTrophies () {
        this.props.toggleDisableTrophies(!this.state.trophies_disabled);
        this.setState({
            trophies: false,
            participation: false,
            overall_score: false,
            high_score: false,
            first_quiz: false,
            trophies_disabled: !this.state.trophies_disabled
        });
    }

    render () {

        const toggleClassnamesTrophies = classnames("notification container average is-info has-text-centered ", {
            "display-none": !this.state.trophies
        });

        let mappedTrophies = this.props.trophies.trophy_name.map((name, i) => {

            return (
                <div key={ i } className="new-module-trophies">
                    <img src={`/assets/trophy/${name}.svg`} className={`new-module-trophy ${this.state.trophies_disabled && 'trophy__disabled'}`} />
                  <div>
                      <p className="new-module-trophy-name f-small-body--primary">{ normaliseText(name) }</p>
                  </div>
                  <div>
                      <input
                          className="form__input form__input--trophy"
                          type="number"
                          min="1"
                          max="100"
                          defaultValue={ this.props.trophies.condition[i] }
                          disabled={this.state.trophies_disabled}
                          onChange={ (e) => this.props.updateTrophyVals(name, e.target.value) } />
                  </div>
                  <div>
                      <p className="new-module-trophy-name f-small-body">{ this.state.trophyUnits[i] }</p>
                  </div>
                </div>
            );
        });

        return (
            <div className="trophies">
                <h3 className="f-body f-body--50">
                    Set the scores needed for different trophies
                </h3>
                <div>
                    <input className="form__checkbox" id="trophy-toggle" type="checkbox" onChange={this.toggleTrophies}></input>
                    <label className="f-body f-body--50" htmlFor="trophy-toggle">Do not use trophies</label>
                </div>
                <div className={ toggleClassnamesTrophies }>
                    <p>
                        { text.trophy.trophies }
                    </p>
                </div>
                    { mappedTrophies }
            </div>
        );

    }
}

Trophies.propTypes = {
    trophies: PropTypes.object.isRequired,
    updateTrophyVals: PropTypes.func.isRequired,
    toggleDisableTrophies: PropTypes.func.isRequired,
};

export default Trophies;
