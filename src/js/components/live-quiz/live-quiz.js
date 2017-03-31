import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import CurrentQuestion from './current-question';
import LiveQuizButtons from './live-quiz-buttons.js';

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
                             <li className="navbar__item">
                                 <Link
                                    to={ `${params.module_id}/student` }
                                    className="navbar__link navbar__link--left navbar__link--back"
                                 >
                                   Quit
                                 </Link>
                             </li>
                         </ul>

                        <p className="f-subheader f-subheader--tertiary">Joining...</p>
                        <p className="logo logo--large logo--large--animated"></p>
                        <div className="holding-message">
                            <p className="f-title"> Waiting for all participants</p>
                            <p className="f-body"> The quiz will start momentarily</p>
                        </div>
                        <div className="hint">
                            <p className="f-label f-label--dark"> Hint </p>
                            <p className="f-body f-body--secondary"> During the quiz, you can change your answer as many times as you like, as long as it's before the next question appears.</p>
                        </div>

                    </div>
                }
                {
                    !isQuizStarted && is_lecturer &&
                    <div className="content content--pattern-background content--join-quiz">

                        <ul className="navbar navbar--invisible">
                            <li className="navbar__item">
                                <Link
                                    to={ `${params.module_id}/lecturer` }
                                    className="f-body navbar__link navbar__link--left navbar__link--quit"
                                    onClick={ () => handleAbortQuiz(quiz_id) }
                                >
                                  Quit
                                </Link>
                            </li>
                        </ul>
                        <div className="content__body">

                            <div className="quiz__titles">
                                <span className="quiz__status-indicator quiz__status-indicator--live f-subheader f-subheader--tertiary">Live Now</span>
                                <img className="quiz__titles-icon" src="Yellow.svg" alt="Letter Q Icon"/>
                                <h1 className="quiz__name f-display f-display--tertiary">{name}</h1>
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
                    isQuizStarted && question && !is_lecturer &&
                    <div className="student-view__questions">
                        <ul className="navbar navbar__light navbar__light--tertiary">
                            <li className="navbar__item">
                                <Link
                                    to={ `${params.module_id}/student` }
                                    className="navbar__link navbar__link--left navbar__link--quit "
                                >
                                    Quit
                                </Link>
                            </li>
                        </ul>

                        <div className="question">
                            <p className="f-subheader"> Q{ nextQuestionIndex }.</p>
                            <p className="f-body">{ question.question }</p>
                        </div>

                        <CurrentQuestion
                            data={ question }
                            handleSelection={ handleSelection }
                            response={ response }/>

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
                            <li className="navbar__item">
                                <Link
                                    to={ `${params.module_id}/lecturer` }
                                    className="f-body navbar__link navbar__link--left navbar__link--quit"
                                    onClick={ () => handleAbortQuiz(quiz_id) }
                                >
                                  Quit
                                </Link>
                            </li>
                        </ul>
                        <div className="content">
                            <div className="live-quiz__question-wrapper">
                                <p className="live-quiz__question-number f-display"> Q{ nextQuestionIndex }.</p>
                                <p className="live-quiz__question f-title">{ question.question }</p>
                            </div>
                            <CurrentQuestion
                                data={ question }
                                handleSelection={ handleSelection }
                                response={ response }/>
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
