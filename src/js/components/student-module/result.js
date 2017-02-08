import React, { PropTypes, Component } from 'react';
import { hashHistory } from 'react-router';
import showNavbar from '../../lib/showNavbar';
import { elastic } from '../../lib/animate';
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

    render () {

        elastic('.trophy-container');

        let { score, medalConditions, percentageScore, params } = this.props; //eslint-disable-line

        let module_id = params.module_id;
        let quiz_id = params.quiz_id;

        let medalClass = classnames("medal-result", {
            "medal-result--gold": percentageScore >= medalConditions[1],
            "medal-result--silver": percentageScore >= medalConditions[0] && percentageScore < medalConditions[1],
            "medal-result--bronze": percentageScore < medalConditions[0] && percentageScore >= 0
        });

        return (
            <div className="result">

              <ul className="navbar navbar--invisible">
                   <li className="navbar__item">
                       <Link to={ `${module_id}/student` } className="f-body navbar__link navbar__link--left navbar__link--quit">
                         Back
                       </Link>
                   </li>
               </ul>
                <p className="logo logo--large"></p>
                <p className="f-display f-display--tertiary"> Quiz Complete </p>
                <div className="result__score">
                    <span className={ medalClass }> </span>
                    <span className="f-label--dark">You Scored:</span>
                    <span className="f-display f-display--secondary">{ percentageScore }%</span>
                </div>
                <Link  className="button button__secondary" to={ `${module_id}/student`}>
                  Finish
                </Link>
            </div>
        );
    }
}

Result.propTypes = {
    params: PropTypes.object,
    score: PropTypes.number.isRequired,
    medalConditions: PropTypes.array.isRequired,
    percentageScore: PropTypes.number.isRequired,
    newTrophies: PropTypes.array
};
