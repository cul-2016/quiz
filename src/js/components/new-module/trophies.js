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
        if (text === "trophies") {
            this.setState({
                trophies: !this.state.trophies
            });
        }
        if (text === "participation")  {
            this.setState({
                participation: !this.state.participation
            });
        }
        if (text === "overall_average")  {
            this.setState({
                overall_average: !this.state.overall_average
            });
        }
        if (text === "high_score")  {
            this.setState({
                high_score: !this.state.high_score
            });
        }
        if (text === "first_quiz")  {
            this.setState({
                first_quiz: !this.state.first_quiz
            });
        }
    }

    render () {

        const toggleClassnamesTrophies = classnames("notification container average is-info has-text-centered ", {
            "display-none": !this.state.trophies
        });
        const toggleClassnames0 = classnames("notification container average is-info has-text-centered ", {
            "display-none": !this.state.participation
        });
        const toggleClassnames1 = classnames("notification container average is-info has-text-centered ", {
            "display-none": !this.state.overall_average
        });
        const toggleClassnames2 = classnames("notification container average is-info has-text-centered ", {
            "display-none": !this.state.high_score
        });
        const toggleClassnames3 = classnames("notification container average is-info has-text-centered ", {
            "display-none": !this.state.first_quiz
        });

        let mappedTrophies = this.props.trophies.trophy_name.map((name, i) => {
            let example = [toggleClassnames0, toggleClassnames1, toggleClassnames2, toggleClassnames3];
            return (
                <div className="columns" key={ i }>
                    <div className="column box is-info has-text-centered">
                        <label className="label module-section-headers">{ normaliseText(name) }</label>
                        <i onClick={ () => { this.toggleRollover(name);} } className="fa fa-question-circle help-icon" />
                        <div className={ example[i] } >
                        <p>
                        { text.trophy.conditions[i] }
                        </p>
                        </div>
                        <div>
                            <input
                                   type="number"
                                   min="1"
                                   max="100"
                                   defaultValue={ this.props.trophies.condition[i] }
                                   onChange={ (e) => this.props.updateTrophyVals(name, e.target.value) } />
                        </div>
                    </div>
                </div>

            );
        });

        return (
            <div className="section column">
                <h3 className="module-section-headers">
                    <i className="fa fa-star" /> Trophies
                </h3>
                <i onClick={ () => { this.toggleRollover("trophies");} } className="fa fa-question-circle help-icon" />


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
