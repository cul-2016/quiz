import React, { PropTypes } from 'react';
import { hashHistory, Link } from 'react-router';
import classnames from 'classnames';
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
    let buttonAreaClasses = classnames("section has-text-centered transparent-background", {
        "animated-infinite pulse": isQuizOpen
    });

    let buttonClasses = classnames("button", {
        "button__tertiary": isQuizOpen,
    });

    let mappedQuizzes = !isFetchingModule && history.map((quiz, i) => {

        const medalConditions = module.medals.condition;
        let percentageScore = Math.round(quiz.score / quiz.num_questions * 100);
        let medalClass = classnames({
            "quiz__item__score--medal--gold": percentageScore >= medalConditions[1],
            "quiz__item__score--medal--silver": percentageScore >= medalConditions[0] && percentageScore < medalConditions[1],
            "quiz__item__score--medal--bronze": percentageScore < medalConditions[0] && percentageScore >= 0
        });

        return (
              <div key={i} className="quiz__item">
                <Link to={`/${module.module_id}/student/history/${quiz.quiz_id}`}>
                    <div className="quiz__item__score">
                      <span className="f-small-label f-small-label--dark quiz__item__score--postion">{ i + 1 }</span>
                        <div className={ medalClass }> </div>
                        <div className="quiz__item__score--percent">{ percentageScore }%</div>
                    </div>
                    <div className="quiz__item__name"> { quiz.name } </div>
                </Link>
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
    return (
        <div>
        {
            isFetchingModule && isFetchingFeedback && isFetchingStudentHistory && <Spinner/>
        }
        {
            !isFetchingModule && !isFetchingFeedback && !isFetchingStudentHistory &&
            <div className="student-module">

                <p className="f-headline"> { module.name } </p>
                <p className="f-title f-title--primary"> { module.module_id } </p>
                <div className={ buttonAreaClasses }>
                    <button onClick={ (e) => { handleAnimation(e, livePath); }} className={ buttonClasses }>
                        Join Live Quiz
                    </button>
                </div>

                <div className="trophy">
                    <label className="f-label"> Trophies </label>
                    <div className="trophy__small"> </div>
                    <span className="f-body"> 1/4 </span>
                </div>
                <Link to={ `${module.module_id}/student/performance` }>
                    <button className="button button__secondary button__icon--right">
                        My Performance
                        <span className="fa-chevron-right"></span>
                    </button>
                </Link>

                <div className="line line__tertiary"></div>

                <div className="quiz">
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
    isFetchingStudentHistory: PropTypes.isfunc,
    isFetchingFeedback: PropTypes.isfunc
};

export default StudentModule;
