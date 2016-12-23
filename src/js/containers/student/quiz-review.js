import { connect } from 'react-redux';

import QuizReviewComponent from '../../components/review/quiz-review-student.js';

const mapStateToProps = (state) => ({
    review: state.review
});

export default connect(mapStateToProps)(QuizReviewComponent);
