import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


class ReviseQuestion extends Component {

    constructor (props) {
        super(props);
        this.state = {
            isAnswerShowing: false
        };
    }

    render () {
        const { idx, question, is_lecturer } = this.props;
        const { isAnswerShowing } = this.state;
        const { response, correct_answer } = question;

        const showAnswers = is_lecturer;
        const answerIsWrong = showAnswers && correct_answer !== response;
        const showWrongAnswer = value => !is_lecturer && response && answerIsWrong
            && value === response.toLowerCase();

        let aClasses = classnames("answer", {
            "same_answer": 'a' === correct_answer.toLowerCase()  && isAnswerShowing,
            "wrong_answer": showWrongAnswer('a') && isAnswerShowing
        });
        let bClasses = classnames("answer", {
            "same_answer": 'b' === correct_answer.toLowerCase() && isAnswerShowing,
            "wrong_answer": showWrongAnswer('b') && isAnswerShowing
        });
        let cClasses = classnames("answer", {
            "display-none": question.c === undefined || question.c === null || question.c === "",
            "same_answer": 'c' === correct_answer.toLowerCase() && isAnswerShowing,
            "wrong_answer": showWrongAnswer('c') && isAnswerShowing
        });
        let dClasses = classnames("answer", {
            "display-none": question.d === undefined  || question.d === null || question.d === "",
            "same_answer": 'd' === correct_answer.toLowerCase() && isAnswerShowing,
            "wrong_answer": showWrongAnswer('d') && isAnswerShowing
        });

        const chosenAnswer = (value) => {
            if (correct_answer.toLowerCase() === value && isAnswerShowing) {
                return (
                    <span className="f-small-body f-small-body--dark chosen-answer">Correct Answer</span>
                );
            }
        };

        return (
            <div key={ idx }>
                <div className="card">
                    <div className="question">
                        <p className="f-body">Q{idx + 1}.</p>
                        <p className="small-body">{question.question}</p>
                    </div>
                    <div className={ aClasses }>
                      <span className="f-label"> A </span>
                      <span className="f-small-body"> { question.a } </span>
                      { chosenAnswer('a') }
                    </div>
                    <div className={ bClasses }>
                      <span className="f-label"> B </span>
                      <span className="f-small-body"> { question.b } </span>
                      { chosenAnswer('b') }
                    </div>
                    <div className={ cClasses }>
                      <span className="f-label"> C </span>
                      <span className="f-small-body"> { question.c } </span>
                      { chosenAnswer('c') }
                    </div>
                    <div className={ dClasses }>
                      <span className="f-label"> D </span>
                      <span className="f-small-body"> { question.d } </span>
                      { chosenAnswer('d') }
                    </div>
                </div>
                <button onClick={ () => this.setState({ isAnswerShowing: !isAnswerShowing }) }className="button">
                    { `${isAnswerShowing ? 'Hide Answer' : 'View Answer' }` }
                </button>
            </div>
        );
    }
}


ReviseQuestion.propTypes = {
    idx: PropTypes.number.isRequired,
    is_lecturer: PropTypes.bool.isRequired,
    question: PropTypes.object.isRequired,
};

export default ReviseQuestion;
