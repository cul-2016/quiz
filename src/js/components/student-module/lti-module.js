import React, { PropTypes } from 'react';
import { hashHistory, Link } from 'react-router';
import Tabs from './tabs'; //eslint-disable-line no-unused-vars
import Spinner from '../general/spinner';
import Trophies from './trophies'; //eslint-disable-line no-unused-vars

const StudentModule = ({ module, history }) => { //eslint-disable-line no-unused-vars
    let { uses_trophies, trophies, trophies_awarded } = module;
    let mappedQuizzes = history.map((quiz, i) => {

        const medalConditions = module.medals.condition;
        let percentageScore = Math.round(quiz.score / quiz.num_questions * 100);

        let medal = percentageScore >= medalConditions[1] ? "gold" : percentageScore >= medalConditions[0] && percentageScore < medalConditions[1] ? "silver" : "bronze";

        return (
            <div key={i} className="quiz__item-container">
                <div className="quiz__item-wrapper">
                    <div className="quiz__item">
                        <div className="quiz__item-result-container">
                            <div className="quiz__item-medal-container">
                                <img src={`/assets/medals/${medal}_medal.svg`} />
                            </div>
                            <div className="quiz__item-text-container">
                                <div className="f-body--heavy"> { quiz.name } </div>
                                <div>
                                    <div className="quiz__item-percentage-score">{ percentageScore }%</div>
                                    <Link
                                    id="ga-review-revise-quiz"
                                    to={`/${module.module_id}/student/history/${quiz.quiz_id}`}>
                                        <div className="f-body--primary quiz__item-button-underline">Review my answers</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="quiz__item-button-container">
                    <Link
                    id="ga-review-revise-quiz"
                    to={`/${module.module_id}/student/revise/${quiz.quiz_id}`}>
                        <div className="button"> Revise </div>
                    </Link>
                </div>
            </div>
        );
    });

    const trophyDescription = (value, i) => {
        const arr = [
            `Complete ${value} quiz`,
            `Get ${value} percentage`,
            `Take ${value} quizzes`,
            `Get ${value} score overall`
        ];
        return arr[i];
    };

    const trophyList = Object.keys(trophies_awarded).map((trophy, i) => {
        let awarded = trophies_awarded[trophy] ? "" : "_grey";
        return (
            <div className="trophyItem" key={trophy}>
                <img key={i} src={`/assets/trophy/${trophy}${awarded}.svg`} className="trophyItem--trophy" />
                <p className="f-small-label"> { trophyDescription(trophies.condition[i], i) } </p>
            </div>
        );
    });

    return (
        <div>
            <div className="student-module">

                <p className="f-title f-title--primary"> { module.name } </p>
                <p className="f-label"> { module.module_id } </p>

                <div className="trophy-container">
                    {uses_trophies && trophyList}
                </div>
                <Link className="my-performance-button" to={ `${module.module_id}/student/performance` }>
                    My Performance
                </Link>
                <div className="quiz quizzes-container">
                    <div className="quiz-results-title">Results</div>
                    { mappedQuizzes }
                </div>

            </div>
        </div>
    );
};

StudentModule.propTypes = {
    children: PropTypes.object,
    trophies: PropTypes.array,
    trophies_awarded: PropTypes.object,
    params: PropTypes.object,
    module: PropTypes.object,
    history: PropTypes.array,
    medalConditions: PropTypes.array,
};

export default StudentModule;
