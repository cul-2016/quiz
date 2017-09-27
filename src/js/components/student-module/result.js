import React, { PropTypes, Component } from 'react';
import { hashHistory } from 'react-router';
import showNavbar from '../../lib/showNavbar';
import { studentResultsWithBadges } from '../../lib/animate';
import { Link } from 'react-router';
import classnames from 'classnames';

export default class Result extends Component {

    constructor (props) {
        super(props);
    }

    returnToDashboard (e, path) {

        e.preventDefault();
        showNavbar(e);
        hashHistory.push(path);
    }


    componentDidMount () {
        studentResultsWithBadges();
    }

    render () {


        let { score, medalConditions, percentageScore, params } = this.props; //eslint-disable-line

        let module_id = params.module_id;
        let quiz_id = params.quiz_id;

        let medalClass = classnames("medal-result", {
            "medal-result--gold": percentageScore >= medalConditions[1],
            "medal-result--silver": percentageScore >= medalConditions[0] && percentageScore < medalConditions[1],
            "medal-result--bronze": percentageScore < medalConditions[0] && percentageScore >= 0
        });

        const calcMedal = () => {
            if (percentageScore >= medalConditions[1]) {
                return 'gold_medal';
            } else if (percentageScore >= medalConditions[0] && percentageScore < medalConditions[1]) {
                return 'silver_medal';
            } else {
                return 'bronze_medal';
            }
        };

        const newTrophies = this.props.newTrophies && this.props.newTrophies.map((trophy, i) => {

            return (
                <div className="result__badges__container" key={i}><img className="result__badges__container--badge" src={ `/assets/trophy/${ trophy }.svg` }></img></div>
            );
        });
        return (
            <div className="result">

                 <p className="f-headline"> { this.props.user.username } </p>

                 {
                     this.props.newTrophies.length > 0 &&
                     <div className="result__badges">
                     { newTrophies }
                     </div>
                 }


                 <div className={ `${this.props.newTrophies.length === 0 ? 'result__score--no-badges' : 'result__score' }` }>
                 <div className={ `result__score ${this.props.newTrophies.length === 0 ? 'result__score--medal--no-badges' : 'result__score--medal' } ` } >
                    <img  className={ `${this.props.newTrophies.length === 0 ? 'medal--no-badges' : '' }` } src= { `/assets/medals/${calcMedal()}.svg` }></img>
                 </div>
                 <div className="result__score--percentScore">
                    <h3 className="result__score--percentScore f-title f-title--primary">{ percentageScore } <span className="f-subheader">%</span></h3>
                 </div>
                 {
                     percentageScore !== 0 &&
                     <div className="result__score--totalScore">
                         <h3 className="result__score--totalScore f-title f-title--primary">{ `${ score } / ${Math.round((score * 100)  /  percentageScore) }` }</h3>
                     </div>
                 }
                 </div>

                <Link  className="button" to={ `${module_id}/student`}>
                  Finish
                </Link>
            </div>
        );
    }
}

Result.propTypes = {
    params: PropTypes.object,
    user: PropTypes.object,
    score: PropTypes.number.isRequired,
    medalConditions: PropTypes.array.isRequired,
    percentageScore: PropTypes.number.isRequired,
    newTrophies: PropTypes.array
};
