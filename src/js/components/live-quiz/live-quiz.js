import React, { PropTypes } from 'react'; //eslint-disable-line no-unused-vars
import CurrentQuestion from './current-question';
import LiveQuizButtons from './live-quiz-buttons';

const LiveQuiz = ({ is_lecturer, question, nextQuestionIndex, nextQuestion, isQuizStarted, submitResponse, startQuiz, numQuestions }) => {
    console.log("QUESTION", question);
    return (
        <div>
                <h1>This is the live quiz</h1>
                <h2>Question index { nextQuestionIndex }</h2>
                <h3>
                {
                    isQuizStarted &&
                    <CurrentQuestion data={ question } />
                }
                </h3>


            <LiveQuizButtons
                is_lecturer={ is_lecturer }
                numQuestions={ numQuestions }
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
    question: PropTypes.object,
    nextQuestionIndex: PropTypes.number,
    nextQuestion: PropTypes.func,
    isQuizStarted: PropTypes.bool,
    submitResponse: PropTypes.func,
    startQuiz: PropTypes.func,
    numQuestions: PropTypes.number
};

export default LiveQuiz;
