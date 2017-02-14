import { connect } from 'react-redux';

import QuizReviewComponent from '../../components/review/quiz-review-student.js';
import { showAnswer } from '../../actions/review.js';

const mapStateToProps = (state) => ({
    review: state.review
});

const mapDispatchToProps = (dispatch) => ({
    showAnswer: (idx) => dispatch(showAnswer(idx))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizReviewComponent);
