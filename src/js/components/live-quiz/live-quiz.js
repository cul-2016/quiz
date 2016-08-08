import React, { PropTypes } from 'react'; //eslint-disable-line no-unused-vars
import LiveQuizButtons from './live-quiz-buttons';

const LiveQuiz = ({ is_lecturer, questions, currentQuestion, nextQuestion, submitResponse }) => {

    return (
        <div>
            This is the live quiz
            {
                questions[currentQuestion].question
            }

            <LiveQuizButtons
                is_lecturer={ is_lecturer }
                numQuestions={ questions.length }
                nextQuestion={ nextQuestion }
                currentQuestion={ currentQuestion }
                submitResponse={ submitResponse } />
        </div>
    );
};

LiveQuiz.propTypes = {
    is_lecturer: PropTypes.bool.isRequired,
    questions: PropTypes.array.isRequired,
    currentQuestion: PropTypes.number,
    nextQuestion: PropTypes.func,
    submitResponse: PropTypes.func
};

export default LiveQuiz;
