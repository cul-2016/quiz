import { connect } from 'react-redux';
import Review from '../components/review/review';
import { flipIsAnswerShowing, incrementCurrentQuizIndex } from '../actions/review';

const mapStateToProps = (state) => ({
    isFetchingReviewQuiz: state.review.isFetchingReviewQuiz,
    numQuestions: state.review.questions && state.review.questions.length,
    question: state.review.questions && state.review.questions[state.review.currentQuizIndex],
    currentQuizIndex: state.review.currentQuizIndex,
    isAnswerShowing: state.review.isAnswerShowing,
});

const mapDispatchToProps = (dispatch) => ({

    handleIsAnswerShowing: () => {

        //flip isAnswerShowing.
        console.log('you clicked answer');
        dispatch(flipIsAnswerShowing());
    },
    handleIncrementCurrentQuizIndex: () => {

        console.log('incrementing question');
        dispatch(incrementCurrentQuizIndex());
    }
});

const ReviewContainer = connect(mapStateToProps, mapDispatchToProps)(Review);

export default ReviewContainer;
