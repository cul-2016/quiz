import React, { PropTypes } from 'react';
import CurrentQuestion from './current-question';
import LiveQuizButtons from './live-quiz-buttons';
import classnames from 'classnames';
import { store } from '../../store';
import { toggleMessageVisibility } from '../../actions/live-quiz';


const LiveQuiz = ({ is_lecturer, question, nextQuestionIndex, nextQuestion, isQuizStarted, submitResponse, isResponseSubmitted, startQuiz, numQuestions, endQuiz, quiz_id, handleSelection, response, name, numParticipants }) => {

    let showOnSubmit = classnames("submit-success", {
        "display-none": !isResponseSubmitted
    });

    if (isResponseSubmitted) {
        setTimeout(() =>{
            store.dispatch(toggleMessageVisibility());
        }, 1000);
    }

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
                        <div className="section has-text-centered">
                            Get ready! <br/> The quiz will start in a moment.
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
                    isQuizStarted && question &&
                    <div>
                        <CurrentQuestion
                            data={ question }
                            handleSelection={ handleSelection }
                            response={ response }/>
                        <div className={ showOnSubmit }>
                            YOU HAVE SUBMITTED THE ANSWER
                        </div>
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
    startQuiz: PropTypes.func,
    numQuestions: PropTypes.number,
    endQuiz: PropTypes.func,
    quiz_id: PropTypes.number,
    handleSelection: PropTypes.func,
    response: PropTypes.string,
    name: PropTypes.string,
    numParticipants: PropTypes.number
};

export default LiveQuiz;
