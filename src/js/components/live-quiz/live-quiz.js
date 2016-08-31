import React, { PropTypes } from 'react'; //eslint-disable-line no-unused-vars
import CurrentQuestion from './current-question';
import LiveQuizButtons from './live-quiz-buttons';
import classnames from 'classnames';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import ReactTransitionGroup from 'react-addons-transition-group';


const LiveQuiz = ({ is_lecturer, question, nextQuestionIndex, nextQuestion, isQuizStarted, submitResponse, startQuiz, numQuestions, endQuiz, quiz_id, handleSelection, response, name }) => {

    let titleClass = classnames({
        "display-none": !nextQuestionIndex
    });
    return (
        <section className="live-quiz container">
            <div className="has-text-centered" >
                <h3>{ name }</h3>

                <h4 className={ titleClass }>Question { nextQuestionIndex }</h4>
            </div>

            <div className="section">
                {
                    isQuizStarted && question &&
                    <CurrentQuestion
                        data={ question }
                        handleSelection={ handleSelection }
                        response={ response }/>
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
    startQuiz: PropTypes.func,
    numQuestions: PropTypes.number,
    endQuiz: PropTypes.func,
    quiz_id: PropTypes.number,
    handleSelection: PropTypes.func,
    response: PropTypes.string,
    name: PropTypes.string
};

export default LiveQuiz;
