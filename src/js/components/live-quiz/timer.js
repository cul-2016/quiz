import React, { Component, PropTypes } from 'react';

class Timer extends Component {

    constructor (props) {
        super(props);

        this.state = {
            isTimerRunning: false,
            duration: 10,
            question: this.props.question
        };
    }

    componentDidMount () {
        this.timerID = setInterval(
            () => this.counter(),
            1000
        );
        this.setState({
            isTimerRunning: true
        });
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.question.question_id !== this.props.question.question_id) {
            //do something. duration
            clearInterval(this.timerID);
            this.setState({
                duration: 10,
                question: nextProps.question,
                isTimerRunning: true
            }, () => {
                this.timerID = setInterval(
                    () => this.counter(),
                    1000
                );
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
            //call the next qiestion
            clearInterval(this.timerID);
            this.setState({
                isTimerRunning: false
            });
        }
    }

    incrementCounter () {
        this.setState({
            duration: this.state.duration + 5
        });
    }

    decrementCounter () {
        if (this.state.duration > 15) {
            this.setState({
                duration: this.state.duration - 5
            });
        }
    }



    render () {
        return (
          <div>
            Timer! Here!
            <div className="button" onClick={() => { this.decrementCounter(); } }>-</div>
            <div className="f-display">{ this.state.duration }</div>
            <div className="button" onClick={() => { this.incrementCounter(); } }>+</div>
          </div>
        );
    }
}


Timer.propTypes = {
    question: PropTypes.object
};


export default Timer;
