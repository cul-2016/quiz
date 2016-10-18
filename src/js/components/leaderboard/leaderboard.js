import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Trophies from './trophies';
import Medals from './medals';


const Leaderboard = ({ mainData, medalScores, quiz_id_list, medalCondition, params }) => { //eslint-disable-line no-unused-vars

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

        let userScores = medalScores.filter((scoreObj) => {
            return scoreObj.user_id === user.user_id;
        });

        return (
            <li className="columns is-desktop" key={ i }>
                <span className="rank-number column is-1">{ rankingNumbers[i] }</span>
                <div className="column is-2">
                    <span className="subtitle is-4">{ user.username }</span>
                </div>
                <div className="column is-1">
                    <span className="subtitle is-4">{ parseFloat(user.total_score) }</span>
                </div>
                <div className="column is-2 is-hidden-mobile">
                    <Trophies data={ user } />
                </div>
                <div className="column is-hidden-mobile">
                    <Medals quiz_id_list={ quiz_id_list } medalCondition={ medalCondition } userScores={ userScores } user_id={ user.user_id } />
                </div>
            </li>
        );
    });

    return (
        <div className="leaderboard">
            <div className="container">
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
                <div className="section">
                    <div className="leaderboard-header columns is-hidden-mobile">
                        <div className="column is-2 is-offset-1">
                            Nickname
                        </div>
                        <div className="column is-1 score-header">
                            Total Score
                        </div>
                        <div className="column">
                            Achievements
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
    medalCondition: PropTypes.array,
    params: PropTypes.object.isRequired
};

export default Leaderboard;
