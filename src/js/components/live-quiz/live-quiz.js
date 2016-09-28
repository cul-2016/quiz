import React, { PropTypes } from 'react';
import CurrentQuestion from './current-question';
import LiveQuizButtons from './live-quiz-buttons';
import classnames from 'classnames';


const LiveQuiz = ({ is_lecturer, question, nextQuestionIndex, nextQuestion, isQuizStarted, submitResponse, isResponseSubmitted, isSavingResponse, startQuiz, numQuestions, endQuiz, quiz_id, handleSelection, response, name, numParticipants, handleAbortQuiz }) => {

    let titleClass = classnames({
        "display-none": !nextQuestionIndex
    });

    return (
        <section className="live-quiz container">

            <div className="has-text-centered" >
                <h1>{ name }</h1>

                <h3 className={ titleClass }>Question { nextQuestionIndex }</h3>
            </div>
            <div>
                {
                    !isQuizStarted && !is_lecturer &&
                    <div className="student-view">
                        <div className="has-text-centered instructions">
                            Get ready!
                            <div>The quiz will start in a moment.</div>

                            <div>
                                During the quiz, you can change your answer as many times as you like, as long as it's before the next question appears. <br />
                            </div>
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
                    isQuizStarted && is_lecturer &&
                    <button onClick={ () => handleAbortQuiz(quiz_id) } className="button is-danger">
                        Abort Quiz
                    </button>
                }
                {
                    isQuizStarted && question &&
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
                submitResponse={ submitResponse }
                isQuizStarted={ isQuizStarted }
                isSavingResponse={ isSavingResponse }
                isResponseSubmitted={ isResponseSubmitted }
                startQuiz={ startQuiz }
                endQuiz={ endQuiz }
                quiz_id={ quiz_id }
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
    handleAbortQuiz: PropTypes.func
};

export default LiveQuiz;
