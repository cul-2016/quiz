import React, { Component, PropTypes } from 'react';

class Timer extends Component {

    constructor (props) {
        super(props);

        this.state = {
            isTimerRunning: false,
            duration: 10, // mutated
            customDuration: 10, // not mutated
            defaultDuration: 10, // not mutated
            question: this.props.question
        };
    }

    componentWillReceiveProps (nextProps) {
        // reset timer on new question
        if ((nextProps.question.question_id !== this.props.question.question_id) && this.state.isTimerRunning) {
            clearInterval(this.timerID);
            this.setState({
                duration: this.state.customDuration,
                question: nextProps.question,
            }, () => {
                this.timerID = setInterval(
                    () => this.counter(),
                    1000
                );
            });
        } else if ((nextProps.question.question_id !== this.props.question.question_id) && !this.state.isTimerRunning) {
            this.setState({
                duration: this.state.customDuration,
                question: nextProps.question,
            });
        }
        return true;
    }

    componentWillUnmount () {
        clearInterval(this.timerID);
    }

    counter () {
        if (this.state.duration > 0) {
            this.setState({
                duration: this.state.duration - 1
            });
        } else {
            clearInterval(this.timerID);
            this.setState({
                isTimerRunning: true, // set timer to run automatically on the next question
                duration: this.state.customDuration
            }, () => {
                if (this.props.nextQuestionIndex !== this.props.numQuestions) {
                    this.props.nextQuestion();
                }
                else if (this.props.nextQuestionIndex === this.props.numQuestions && this.props.review) {
                    this.props.handleAbortQuiz(this.props.quiz_id);
                }
                else {
                    this.props.endQuiz(this.props.quiz_id);
                }
            });
        }
    }

    incrementCounter () {
        this.setState({
            duration: this.state.duration + 5,
            customDuration: this.state.customDuration + 5,
        });
    }

    decrementCounter () {
        if (this.state.duration > 15) {
            this.setState({
                duration: this.state.duration - 5,
                customDuration: this.state.customDuration - 5
            });
        }
    }

    toggleCounter () {
        if (!this.state.isTimerRunning) {
            this.setState({
                isTimerRunning: true
            }, () => {
                this.timerID = setInterval(
                    () => this.counter(),
                    1000
                );
            });
        }
        else {
            clearInterval(this.timerID);
            this.setState({
                isTimerRunning: false
            });
        }
    }



    render () {
        return (
          <div>
            Timer! Here!
            <div className="button" onClick={() => { this.decrementCounter(); } }>-</div>
            <div className="f-display" onClick={() => { this.toggleCounter(); } }>{ this.state.duration }</div>
            <div className="button" onClick={() => { this.incrementCounter(); } }>+</div>
          </div>
        );
    }
}


Timer.propTypes = {
    question: PropTypes.object,
    numQuestions: PropTypes.number,
    nextQuestionIndex: PropTypes.number,
    nextQuestion: PropTypes.func,
    endQuiz: PropTypes.func,
    quiz_id: PropTypes.number,
    review: PropTypes.bool,
    handleAbortQuiz: PropTypes.func
};


export default Timer;
