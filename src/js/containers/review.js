import { connect } from 'react-redux';
import Review from '../components/review/review';
import { flipIsAnswerShowing, incrementCurrentQuizIndex } from '../actions/review';

const mapStateToProps = (state) => ({
    isFetchingReview: state.review.isFetchingReview,
    numQuestions: state.review.questions && state.review.questions.length,
    question: state.review.questions && state.review.questions[state.review.currentQuizIndex],
    currentQuizIndex: state.review.currentQuizIndex,
    isAnswerShowing: state.review.isAnswerShowing,
});

const mapDispatchToProps = (dispatch) => ({

    handleIsAnswerShowing: () => {

        //flip isAnswerShowing.
        dispatch(flipIsAnswerShowing());
    },
    handleIncrementCurrentQuizIndex: () => {

        dispatch(incrementCurrentQuizIndex());
    }
});

const ReviewContainer = connect(mapStateToProps, mapDispatchToProps)(Review);

export default ReviewContainer;
