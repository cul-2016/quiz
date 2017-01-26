import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import CurrentQuestion from './current-question';
import LiveQuizButtons from './live-quiz-buttons.js';
import classnames from 'classnames';


const LiveQuiz = ({ is_lecturer, question, nextQuestionIndex,
                    nextQuestion, isQuizStarted, submitResponse, //eslint-disable-line no-unused-vars
                    isResponseSubmitted, isSavingResponse, startQuiz,
                    numQuestions, endQuiz, quiz_id,
                    handleSelection, response, name, //eslint-disable-line no-unused-vars
                    numParticipants, handleAbortQuiz, params, review }) => {

    let titleClass = classnames({
        "display-none": !nextQuestionIndex
    });

    return (
        <section className="live-quiz container">

            <div className="has-text-centered" >

                <h3 className={ titleClass }>Question { nextQuestionIndex }</h3>
            </div>
            <div>
                {
                    !isQuizStarted && !is_lecturer &&
                    <div className="student-view">
                        <nav className="navbar navbar__secondary">
                            <li className="navbar__item">
                                <Link to={ `${params.module_id}/student` } className="navbar__link navbar__link--left navbar__link--back">
                                    Quit
                                </Link>
                            </li>
                        </nav>

                        <p className="f-subheader f-subheader--tertiary">Joining...</p>
                        <p className="logo logo--large"></p>
                        <div className="holding-message">
                            <p className="f-title"> Waiting for all participants</p>
                            <p className="f-body"> The quiz will start momentarily</p>
                        </div>
                        <div className="hint">
                            <p className="f-label f-label--dark"> Hint </p>
                            <p className="f-body f-body--secondary"> During the quiz, you can change your answer as many times as you like, as long as it''s before the next question appears.</p>
                        </div>

                    </div>
                }
                {
                    !isQuizStarted && is_lecturer &&
                    <h2 className="has-text-centered">
                        Number of Participants: { numParticipants }
                    </h2>
                }
                {
                    isQuizStarted && is_lecturer && !review &&
                    <button onClick={ () => handleAbortQuiz(quiz_id) } className="button is-danger">
                        Abort Quiz
                    </button>
                }
                {
                    isQuizStarted && question && !is_lecturer &&
                    <div className="student-view__questions">
                        <nav className="navbar navbar__light navbar__light--tertiary">
                            <li className="navbar__item">
                                <Link to={ `${params.module_id}/student` } className="navbar__link navbar__link--left navbar__link--quit ">
                                    Quit
                                </Link>
                            </li>
                        </nav>

                        <div className="question">
                            <p className="f-subheader"> Q{ nextQuestionIndex }.</p>
                            <p className="f-body">{ question.question }</p>
                        </div>
                        <CurrentQuestion
                            data={ question }
                            handleSelection={ handleSelection }
                            response={ response }/>
                          <div className="live-quiz-footer">
                            <div className="logo__primary--dark"></div>
                          </div>
                    </div>
                }
                {
                    isQuizStarted && question && is_lecturer &&
                    <div>
                        <CurrentQuestion
                            data={ question }
                            handleSelection={ handleSelection }
                            response={ response }/>
                    </div>
                }
            </div>
            <LiveQuizButtons
                is_lecturer={ is_lecturer }
                numQuestions={ numQuestions }
                nextQuestion={ nextQuestion }
                nextQuestionIndex={ nextQuestionIndex }
                isQuizStarted={ isQuizStarted }
                isSavingResponse={ isSavingResponse }
                isResponseSubmitted={ isResponseSubmitted }
                startQuiz={ startQuiz }
                endQuiz={ endQuiz }
                quiz_id={ quiz_id }
                review={ review }
                handleAbortQuiz={ handleAbortQuiz }
                response={ response } />
        </section>
    );
};

LiveQuiz.propTypes = {
    is_lecturer: PropTypes.bool.isRequired,
    question: PropTypes.object,
    nextQuestionIndex: PropTypes.number,
    nextQuestion: PropTypes.func,
    isQuizStarted: PropTypes.bool.isRequired,
    submitResponse: PropTypes.func,
    isResponseSubmitted: PropTypes.bool,
    isSavingResponse: PropTypes.bool,
    startQuiz: PropTypes.func,
    numQuestions: PropTypes.number,
    endQuiz: PropTypes.func,
    quiz_id: PropTypes.number,
    handleSelection: PropTypes.func,
    response: PropTypes.string,
    name: PropTypes.string,
    numParticipants: PropTypes.number,
    handleAbortQuiz: PropTypes.func,
    params: PropTypes.object,
    review: PropTypes.bool 
};

export default LiveQuiz;
