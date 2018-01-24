import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import CurrentQuestion from './current-question';
import LiveQuizButtons from './live-quiz-buttons';
import Timer from './timer';

const LiveQuiz = ({ is_lecturer, question, nextQuestionIndex,
                    nextQuestion, isQuizStarted, submitResponse, //eslint-disable-line no-unused-vars
                    isResponseSubmitted, isSavingResponse, startQuiz,
                    numQuestions, endQuiz, quiz_id,
                    handleSelection, response, name, //eslint-disable-line no-unused-vars
                    numParticipants, handleAbortQuiz, params, review }) => {


    return (
        <section className="live-quiz container">
                {
                    !isQuizStarted && !is_lecturer &&
                    <div className="student-view">
                        <ul className="navbar navbar--invisible">
                          <div className="navbar__inner">
                             <li className="navbar__item navbar__item--onlyone">
                                 <Link
                                    to={ `${params.module_id}/student` }
                                    className="f-body navbar__link"
                                 >
                                   Quit
                                 </Link>
                             </li>
                           </div>
                         </ul>

                        <p className="f-headline">Joining...</p>
                        <img className="holding-logo" src="/assets/dashboard_tile_logo.svg" />
                        <div className="holding-message">
                            <p className="f-title"> Waiting for all participants</p>
                            <p className="f-body"> The quiz will start momentarily</p>
                        </div>
                        <div className="hint">
                            <p className="f-label f-label--dark"> Hint </p>
                            <p className="f-body f-body--secondary"> During the quiz, you can change your answer as many times as you like, as long as it&#39;s before the next question appears.</p>
                        </div>

                    </div>
                }
                {
                    !isQuizStarted && is_lecturer &&
                    <div className="content content--pattern-background content--join-quiz">

                        <ul className="navbar navbar--invisible">
                          <div className="navbar__inner">
                            <li className="navbar__item navbar__item--onlyone">
                                <Link
                                    to={ `${params.module_id}/lecturer` }
                                    className="f-body navbar__link"
                                    onClick={ () => handleAbortQuiz(quiz_id) }
                                >
                                  Quit
                                </Link>
                            </li>
                          </div>
                        </ul>
                        <div className="content__body">

                            <div className="quiz__titles">
                                <img className="holding-logo" src="/assets/dashboard_tile_logo.svg" alt="Letter Q Icon"/>
                                <div className="quiz__status-indicator quiz__status-indicator--live f-headline f-headline--secondary">Live Now</div>
                                <h1 className="quiz__name f-display">{name}</h1>
                            </div>

                            <p className="quiz__cta f-title">
                                Join this Quiz at <span className="f-title f-title--secondary">quodl.co.uk</span> with Module code:
                            </p>
                            <div className="quiz__module">
                                <span className="f-headline quiz__module-code">
                                    {params.module_id}
                                </span>
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
                            <span className="quiz__copy quiz__copy--center f-subheader">
                                { numParticipants } Students Connected
                            </span>

                        </div>
                    </div>
                }
                {
                    isQuizStarted && is_lecturer && !question &&
                    <div>
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
                        <button onClick={ () => handleAbortQuiz(quiz_id) } className="button is-danger">
                            Abort Quiz
                        </button>
                    </div>
                }
                {
                    isQuizStarted && !is_lecturer && question &&
                    <div className="student-view__questions">

                    <div className="question">
                        <div className="live-quiz__question-number-container  live-quiz__answer-inner">
                            <span className="f-display live-quiz__question-number-mobile">Q{question.order_id}  </span>
                            <span className="live-quiz__answer-text f-body">  { question.question }</span>
                        </div>
                    </div>

                        <CurrentQuestion
                            data={ question }
                            handleSelection={ handleSelection }
                            response={ response }
                            isLecturer={ is_lecturer }/>

                        <div className="live-quiz__footer">
                            <div className="logo logo--footer"></div>
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
                            response={ response } />
                    </div>
                }
                {
                    isQuizStarted && question && is_lecturer &&
                    <div>
                        <ul className="navbar navbar--invisible">
                          <div className="navbar__inner">
                            <li className="navbar__item navbar__item--onlyone">
                                <Link
                                    to={ `${params.module_id}/lecturer` }
                                    className="f-body navbar__link"
                                    onClick={ () => handleAbortQuiz(quiz_id) }
                                >
                                  Quit
                                </Link>
                            </li>
                          </div>
                        </ul>
                        <div className="content content__body">
                            <div className="live-quiz__question-wrapper">
                                <p className="live-quiz__question-number f-display"> Q{ nextQuestionIndex }</p>
                                <p className="live-quiz__question f-title">{ question.question }</p>
                            </div>
                            <Timer
                                question={ question }
                                numQuestions={ numQuestions }
                                nextQuestionIndex={ nextQuestionIndex }
                                review={ review }
                                quiz_id={ quiz_id }
                                handleAbortQuiz={ handleAbortQuiz }
                                endQuiz={ endQuiz }
                                nextQuestion={ nextQuestion }
                            />
                            <CurrentQuestion
                                data={ question }
                                handleSelection={ handleSelection }
                                response={ response }
                                isLecturer={ is_lecturer }/>
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
                        </div>
                    </div>
                }
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
