import React, { PropTypes, Component } from 'react';
import { hashHistory } from 'react-router';
import normaliseText from '../../lib/normaliseText';
import showNavbar from '../../lib/showNavbar';
import ResultMedal from './result-medal';
import { elastic } from '../../lib/animate';
import { Link } from 'react-router';


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

        let { score, newTrophies, medalConditions, percentageScore, params } = this.props;

        let module_id = params.module_id;
        newTrophies = newTrophies || [];

        let trophiesToPresent = newTrophies.map((trophy, i) => {

            return (
                <div key={ i } className="column trophy-container">
                    <div className="trophy" />
                    <p>{ normaliseText(trophy) }</p>
                </div>
            );
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

                <div>
                  <span className="medal-result medal-result--silver"> </span>
                  <span>You Score:</span>
                  <span className="f-display f-display--secondary">{ percentageScore }</span>
                </div>
                        <h2 className="f-subtitle">Your score is...</h2>
                        <div className="columns is-mobile">
                            { trophiesToPresent }
                        </div>
                        <ResultMedal
                            score={ score }
                            percentageScore={ percentageScore }
                            medalConditions={ medalConditions }
                            trophiesToPresent={ trophiesToPresent } />
                        <button onClick={ (e) => { this.returnToDashboard(e, `/${module_id}/student`); } } className="button is-large is-success is-fullwidth">
                            Finish
                        </button>
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
