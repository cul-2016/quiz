import React, { PropTypes } from 'react'; //eslint-disable-line no-unused-vars
import LiveQuizButtons from './live-quiz-buttons';

const LiveQuiz = ({ is_lecturer, questions, nextQuestionIndex, nextQuestion, isQuizStarted, submitResponse, startQuiz }) => {

    return (
        <div>
            This is the live quiz
            {
                isQuizStarted && questions[nextQuestionIndex].question
            }

            <LiveQuizButtons
                is_lecturer={ is_lecturer }
                numQuestions={ questions.length }
                nextQuestion={ nextQuestion }
                nextQuestionIndex={ nextQuestionIndex }
                submitResponse={ submitResponse }
                isQuizStarted={ isQuizStarted }
                startQuiz={ startQuiz } />
        </div>
    );
};

LiveQuiz.propTypes = {
    is_lecturer: PropTypes.bool.isRequired,
    questions: PropTypes.array.isRequired,
    nextQuestionIndex: PropTypes.number,
    nextQuestion: PropTypes.func,
    isQuizStarted: PropTypes.bool.isRequired,
    submitResponse: PropTypes.func,
    startQuiz: PropTypes.func.isRequired
};

export default LiveQuiz;
