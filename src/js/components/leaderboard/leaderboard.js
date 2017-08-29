import React, { PropTypes } from 'react';
import { Link } from 'react-router';

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
        let bronzeTotal = 0;
        let silverTotal = 0;
        let goldTotal = 0;
        let firstQuiz = user.first_quiz ? 'yes' : 'no';
        let highScore = user.high_score ? 'yes' : 'no';
        let overallScore = user.overall_score ? 'yes' : 'no';
        let participation = user.participation ? 'yes' : 'no';


        userScores.map((quiz) => {
            if (quiz.percentage_score > 0 && quiz.percentage_score <= medalCondition[0]) {
                bronzeTotal += 1;
            } else if (quiz.percentage_score > medalCondition[0] && quiz.percentage_score <= medalCondition[1]) {
                silverTotal += 1;
            } else if (quiz.percentage_score > medalCondition[1]) {
                goldTotal += 1;
            }
        });

        return (
          <tr key={i} className="leaderboard__row">
              <td className="leaderboard__cell f-body"> { rankingNumbers[i] } </td>
              <td className="leaderboard__cell leaderboard__cell--tl f-body"> { user.username } </td>
              <td className="leaderboard__cell leaderboard__cell--tl f-body"> { firstQuiz } { highScore } { overallScore } { participation } </td>
              <td className="leaderboard__cell f-body"> { bronzeTotal} </td>
              <td className="leaderboard__cell f-body"> { silverTotal } </td>
              <td className="leaderboard__cell f-body"> { goldTotal } </td>
              <td className="leaderboard__cell leaderboard__cell--narrow f-body"> [diff] </td>
              <td className="leaderboard__cell leaderboard__cell--narrow f-body"> { parseFloat(user.total_score) } </td>
          </tr>
        );
    });

    return (
        <div className="leaderboard">
               <div className="content__body">
                    <div className="leaderboard__image"></div>
                    <table className="leaderboard__table">
                        <thead className="leaderboard__header">
                            <tr>
                                <th className="leaderboard__cell leaderboard__cell--header leaderboard__cell--narrow f-body f-body--white">#</th>
                                <th className="leaderboard__cell leaderboard__cell--header leaderboard__cell--tl f-body f-body--white">Name</th>
                                <th className="leaderboard__cell leaderboard__cell--header leaderboard__cell--tl f-body f-body--white">Badges</th>
                                <th className="leaderboard__cell leaderboard__cell--header leaderboard__cell--narrow">
                                  <p className="medal-small medal-small--bronze"></p>
                                </th>
                                <th className="leaderboard__cell leaderboard__cell--header leaderboard__cell--narrow">
                                  <p className="medal-small medal-small--silver"></p>
                                </th>
                                <th className="leaderboard__cell leaderboard__cell--header leaderboard__cell--narrow">
                                  <p className="medal-small medal-small--gold"></p>
                                </th>
                                <th className="leaderboard__cell leaderboard__cell--header leaderboard__cell--narrow f-body f-body--white">Trend</th>
                                <th className="leaderboard__cell leaderboard__cell--header leaderboard__cell--narrow f-body f-body--white">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                          { mappedLeaderboard }
                        </tbody>
                  </table>
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
