import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class LiveQuizButtons extends Component {

    constructor (props) {
        super(props);
        this.state = {
            nextButtonDisabled: false
        };
    }

    disableNextButton () {
        this.setState({
            nextButtonDisabled: !this.state.nextButtonDisabled
        });
        this.disableNextButton = this.disableNextButton.bind(this);
    }
    render () {

        let { is_lecturer, numQuestions, nextQuestionIndex,
                                   nextQuestion, isQuizStarted, isSavingResponse, //eslint-disable-line no-unused-vars
                                   isResponseSubmitted, startQuiz, endQuiz, //eslint-disable-line no-unused-vars
                                   quiz_id, response, review, handleAbortQuiz } = this.props;

        let startButtonClasses = classnames("button button--large start-quiz-button", {
            "display-none": !is_lecturer || isQuizStarted
        });

        let nextButtonClasses = classnames("button button__secondary", {
            "display-none": !is_lecturer || nextQuestionIndex === 0 || nextQuestionIndex === numQuestions,
            "button__disabled": this.state.nextButtonDisabled  
        });

        let endButtonClasses = classnames("button button--large button__primary", {
            "display-none": !is_lecturer || nextQuestionIndex !== numQuestions
        });

        return (
            <div>
                <div className="button__wrapper button__wrapper--centered">
                    <button className={ startButtonClasses } onClick={ startQuiz }>
                        Start { review ? 'Preview' : 'Quiz' }
                    </button>
                </div>
                <div className="button__wrapper button__wrapper--right">
                    <button disabled={this.state.nextButtonDisabled} className={ nextButtonClasses }
                    onClick={ () => {
                        console.log('clicking button');
                        nextQuestion();
                        this.disableNextButton();
                        setTimeout(() => { this.disableNextButton(); }, 1000); }
                    }>
                        Next question
                    </button>

                    <button className={ endButtonClasses } onClick={ () => review ? handleAbortQuiz(quiz_id) : endQuiz(quiz_id) }>
                        { review ? 'End Preview' : 'End Quiz' }
                    </button>
                </div>
            </div>
        );
    }
}

LiveQuizButtons.propTypes = {
    is_lecturer: PropTypes.bool.isRequired,
    numQuestions: PropTypes.number,
    nextQuestionIndex: PropTypes.number,
    nextQuestion: PropTypes.func,
    isQuizStarted: PropTypes.bool,
    isSavingResponse: PropTypes.bool,
    isResponseSubmitted: PropTypes.bool,
    startQuiz: PropTypes.func,
    endQuiz: PropTypes.func,
    quiz_id: PropTypes.number,
    response: PropTypes.string,
    review: PropTypes.bool,
    handleAbortQuiz: PropTypes.func
};

export default LiveQuizButtons;
