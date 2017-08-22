import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

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

        let rowClass = classnames({
            "leaderboard__row--odd": rankingNumbers[i] % 2 !== 0,
            "leaderboard__row--even": rankingNumbers[i] % 2 === 0
        });

        return (
          <tr key={i} className={ rowClass }>
              <td className="f-body"> { rankingNumbers[i] } </td>
              <td className="f-body"> { user.username } </td>
              <td className="f-body"> { bronzeTotal} </td>
              <td className="f-body"> { silverTotal } </td>
              <td className="f-body"> { goldTotal } </td>
              <td className="f-body"> { firstQuiz } </td>
              <td className="f-body"> { highScore } </td>
              <td className="f-body"> { overallScore } </td>
              <td className="f-body"> { participation } </td>
              <td className="f-body"> { parseFloat(user.total_score) } </td>
          </tr>
        );
    });

    return (
        <div className="leaderboard">
               <div>
                   <ul className="navbar navbar--invisible">
                       <li className="navbar__item">
                           <Link to={ `${params.module_id}/lecturer` } className="f-body navbar__link navbar__link--left navbar__link--quit">
                             Back
                           </Link>
                       </li>
                   </ul>
               </div>
               <div className="content__body">
                    <h1 className="f-headline">Module Leaderboard</h1>
                    <table>
                        <thead>
                            <tr>
                                <th className="f-body f-body--white">Pos</th>
                                <th className="f-body f-body--white">Name</th>
                                <th>
                                  <p className="medal-small medal-small--bronze"></p>
                                </th>
                                <th>
                                  <p className="medal-small medal-small--silver"></p>
                                </th>
                                <th>
                                  <p className="medal-small medal-small--gold"></p>
                                </th>
                                <th className="f-body f-body--white">first quiz</th>
                                <th className="f-body f-body--white">high score</th>
                                <th className="f-body f-body--white">overall score</th>
                                <th className="f-body f-body--white">participation</th>
                                <th className="f-body f-body--white">Score</th>
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
