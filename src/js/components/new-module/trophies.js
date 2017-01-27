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
            overall_average: false,
            high_score: false,
            first_quiz: false
        };
    }

    toggleRollover (text) {
        this.setState({
            [text]: !this.state[text]
        });
    }

    returnClassnames (text) {
        return classnames("notification container average is-info has-text-centered ", {
            "display-none": !this.state[text]
        });
    }

    render () {

        const toggleClassnamesTrophies = classnames("notification container average is-info has-text-centered ", {
            "display-none": !this.state.trophies
        });

        let mappedTrophies = this.props.trophies.trophy_name.map((name, i) => {

            return (
                <div key={ i }>

                    <div className="new-module-trophies">
                      <p className="trophy__small--new-module"> </p>
                      <p className="f-small-body f-small-body--primary">{ normaliseText(name) }</p>
                      <input
                        className="form__input form__input--trophy"
                        type="number"
                        min="1"
                        max="100"
                        defaultValue={ this.props.trophies.condition[i] }
                        onChange={ (e) => this.props.updateTrophyVals(name, e.target.value) } />
                    </div>
                 </div>

            );
        });

        return (
            <div className="section column">
                <h3 className="f-body f-body--light">
                    Trophies
                </h3>

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
    updateTrophyVals: PropTypes.func.isRequired
};

export default Trophies;
