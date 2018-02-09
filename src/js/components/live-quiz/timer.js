import React, { Component, PropTypes } from 'react';

import decrementIcon from '../../../../public/assets/timer/arrow-left.svg';
import incrementIcon from '../../../../public/assets/timer/arrow-right.svg';

class Timer extends Component {

    constructor (props) {
        super(props);

        this.state = {
            isTimerRunning: false,
            duration: 30, // mutated
            customDuration: 30, // not mutated
            defaultDuration: 30, // not mutated
            warning: false,
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
                warning: false
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
        if (this.state.duration <= 6 && !this.state.warning) {
            this.setState({
                duration: this.state.duration - 1,
                warning: true
            });
        }
        else if (this.state.duration > 0) {
            this.setState({
                duration: this.state.duration - 1
            });
        } else {
            clearInterval(this.timerID);
            if (this.props.nextQuestionIndex !== this.props.numQuestions) {
                this.props.nextQuestion();
            }
            else if (this.props.nextQuestionIndex === this.props.numQuestions && this.props.review) {
                this.props.handleAbortQuiz(this.props.quiz_id);
            }
            else {
                this.props.endQuiz(this.props.quiz_id);
            }
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
          <div className="live-quiz__timer-container">
            <div onClick={() => { this.decrementCounter(); } }>
                <img src={ decrementIcon } alt="decrement counter" className="live-quiz__timer-decrement"/>
            </div>
            <div className={`f-display live-quiz__timer ${this.state.warning ? 'live-quiz__timer--warning' : ''}`} onClick={() => { this.toggleCounter(); } }>{ this.state.duration }</div>
            <div onClick={() => { this.incrementCounter(); } }>
                <img src={ incrementIcon } alt="increment counter" className="live-quiz__timer-increment"/>
            </div>
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
