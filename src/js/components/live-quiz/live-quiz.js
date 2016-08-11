import React, { PropTypes } from 'react'; //eslint-disable-line no-unused-vars
import CurrentQuestion from './current-question';
import LiveQuizButtons from './live-quiz-buttons';

const LiveQuiz = ({ is_lecturer, question, nextQuestionIndex, nextQuestion, isQuizStarted, submitResponse, startQuiz, numQuestions, endQuiz, quiz_id, handleSelection, response }) => {

    return (
        <div>
            <h1>This is the live quiz</h1>
            <h2>Question index { nextQuestionIndex }</h2>
            <h3>
            {
                isQuizStarted && question &&
                <CurrentQuestion
                    data={ question }
                    handleSelection={ handleSelection }
                    response={ response }/>
            }
            </h3>


            <LiveQuizButtons
                is_lecturer={ is_lecturer }
                numQuestions={ numQuestions }
                nextQuestion={ nextQuestion }
                nextQuestionIndex={ nextQuestionIndex }
                submitResponse={ submitResponse }
                isQuizStarted={ isQuizStarted }
                startQuiz={ startQuiz }
                endQuiz={ endQuiz }
                quiz_id={ quiz_id } />
        </div>
    );
};

LiveQuiz.propTypes = {
    is_lecturer: PropTypes.bool.isRequired,
    question: PropTypes.object,
    nextQuestionIndex: PropTypes.number,
    nextQuestion: PropTypes.func,
    isQuizStarted: PropTypes.bool.isRequired,
    submitResponse: PropTypes.func,
    startQuiz: PropTypes.func,
    numQuestions: PropTypes.number,
    endQuiz: PropTypes.func,
    quiz_id: PropTypes.number,
    handleSelection: PropTypes.func,
    response: PropTypes.string
};

export default LiveQuiz;
