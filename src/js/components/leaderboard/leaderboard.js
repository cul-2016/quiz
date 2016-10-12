import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Trophies from './trophies';


const Leaderboard = ({ mainData, medalScores, quiz_id_list, params }) => { //eslint-disable-line no-unused-vars

    let rankingNumbers = mainData.map((user, i) => {
        if (i === 0){
            return 1;
        } else if (user.total_score === mainData[i - 1].total_score ) {
            return "=";
        } else {
            return i + 1;
        }
    });

    let mappedLeaderboard = mainData.map((user, i) => {
        console.log(user);
        return (
            <li className="columns is-mobile" key={ i }>
                <span className="rank-number column is-1">{ rankingNumbers[i] }</span>
                <div className="column is-2">
                    <span className="subtitle is-4">{ user.username }</span>
                </div>
                <div className="column is-1">
                    <span className="subtitle is-4">{ parseFloat(user.total_score) }</span>
                </div>
                <div className="column is-2">
                    <Trophies data={ user } />
                </div>
            </li>
        );
    });

    return (
        <div className="leaderboard">
            <div className="container average">
                <h1 className="has-text-centered">Leaderboard</h1>
                <div className="column">
                    <Link to={ `/${params.module_id}/lecturer` }>
                        <button className="button is-3 is-light">
                            <span className="icon">
                                <i className="fa fa-chevron-left"></i>
                            </span>
                            <span>Back to { params.module_id }</span>
                        </button>
                    </Link>
                </div>
                <div className="section average">
                    <div className="leaderboard-header columns is-mobile">
                        <div className="column is-2 is-offset-1">
                            Nickname
                        </div>
                        <div className="column is-1 score-header">
                            Average score (%)
                        </div>
                        <div className="column">
                            Trophies
                        </div>
                    </div>
                    <ol>
                        { mappedLeaderboard }
                    </ol>
                </div>
            </div>
        </div>
    );
};

Leaderboard.propTypes = {
    mainData: PropTypes.array,
    medalScores: PropTypes.array,
    quiz_id_list: PropTypes.array,
    params: PropTypes.object.isRequired
};

export default Leaderboard;
