import { connect } from 'react-redux';
import QuizReview from '../components/review/quiz-review';
import { flipIsAnswerShowing, incrementCurrentQuizIndex } from '../actions/review-quiz';

const mapStateToProps = (state) => ({
    isFetchingReviewQuiz: state.reviewQuiz.isFetchingReviewQuiz,
    numQuestions: state.reviewQuiz.questions && state.reviewQuiz.questions.length,
    question: state.reviewQuiz.questions && state.reviewQuiz.questions[state.reviewQuiz.currentQuizIndex],
    currentQuizIndex: state.reviewQuiz.currentQuizIndex,
    isAnswerShowing: state.reviewQuiz.isAnswerShowing,
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

const QuizReviewContainer = connect(mapStateToProps, mapDispatchToProps)(QuizReview);

export default QuizReviewContainer;
