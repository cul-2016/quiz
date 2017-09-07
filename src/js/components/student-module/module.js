import React, { PropTypes } from 'react';
import { hashHistory, Link } from 'react-router';
import Tabs from './tabs'; //eslint-disable-line no-unused-vars
import Spinner from '../general/spinner';
import Trophies from './trophies'; //eslint-disable-line no-unused-vars

const StudentModule = ({ location,
                        trophies, trophies_awarded, //eslint-disable-line no-unused-vars
                        isFetchingModule, isFetchingFeedback, //eslint-disable-line no-unused-vars
                        isFetchingStudentHistory, isQuizOpen, //eslint-disable-line no-unused-vars
                        quiz_id, question, response, //eslint-disable-line no-unused-vars
                        handleJoiningQuiz, params, module,
                        review, history }) => { //eslint-disable-line no-unused-vars

    let mappedQuizzes = !isFetchingModule && history.map((quiz, i) => {

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
                                    <Link to={`/${module.module_id}/student/history/${quiz.quiz_id}`}>
                                        <div className="f-body--primary quiz__item-button-underline">Review my answers</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="quiz__item-button-container">
                    <Link to={`/${module.module_id}/student/revise/${quiz.quiz_id}`}>
                        <div className="button"> Revise </div>
                    </Link>
                </div>
            </div>
        );
    });

    let handleAnimation = (e, livePath) => {
        e.preventDefault();

        /* eslint-disable no-undef */
        const tl = new TimelineMax();
        tl.add( TweenMax.to('.button-expand-animation', 0.1, { css: { color: 'transparent' } }));
        tl.add( TweenMax.fromTo('.nav', 0.5, { y: 0 }, { y: -70, ease: Power1.easeOut }) );
        tl.add( TweenMax.fromTo('.button-expand-animation', 1.0, { scale: 1, backgroundColor: '#fce473' }, { scale: 50, backgroundColor: '#42afe3', ease: Circ.easeIn }));
        /* eslint-enable */
        setTimeout( () => {
            hashHistory.push(livePath);
            handleJoiningQuiz(params.module_id);
        }, 100);

    };

    let url = location.pathname.split('/');
    let livePath = isQuizOpen ? `/${url[1]}/${url[2]}/live` : location.pathname;

    const trophyList = Object.keys(trophies_awarded).map((trophy, i) => {
        let awarded = trophies_awarded[trophy] ? "" : "_grey";
        return (
            <img key={i} src={`/assets/trophy/${trophy}${awarded}.svg`} className="trophyItem" />
        );
    });

    return (
        <div>
        {
            isFetchingModule && isFetchingFeedback && isFetchingStudentHistory && <Spinner/>
        }
        {
            !isFetchingModule && !isFetchingFeedback && !isFetchingStudentHistory &&
            <div className="student-module">

                <p className="f-title f-title--primary"> { module.name } </p>
                <p className="f-label"> { module.module_id } </p>
                { isQuizOpen &&
                    <div className="live-quiz-button">
                        <img src="/assets/logo/nav_icon.svg" className="live-quiz-button-logo" />
                        <div onClick={ (e) => { handleAnimation(e, livePath); }} className="live-quiz-button-text">
                            Join <span className="live-quiz-button-text-live">Live</span> Quiz
                        </div>
                    </div>
                }
                <div className="trophy-container">
                    {trophyList}
                </div>
                <Link className="my-performance-button" to={ `${module.module_id}/student/performance` }>
                    My Performance
                </Link>
                <div className="quiz quizzes-container">
                    <div className="quiz-results-title">Results</div>
                    { mappedQuizzes }
                </div>

            </div>
        }
        </div>
    );
};

StudentModule.propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.object,
    trophies: PropTypes.array,
    trophies_awarded: PropTypes.object,
    isFetchingModule: PropTypes.bool.isRequired,
    isQuizOpen: PropTypes.bool.isRequired,
    quiz_id: PropTypes.number,
    question: PropTypes.string,
    response: PropTypes.string,
    handleJoiningQuiz: PropTypes.func,
    params: PropTypes.object,
    module: PropTypes.object,
    review: PropTypes.object,
    history: PropTypes.array,
    medalConditions: PropTypes.array,
    isFetchingStudentHistory: PropTypes.bool,
    isFetchingFeedback: PropTypes.bool
};

export default StudentModule;
