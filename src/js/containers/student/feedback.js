import { connect } from 'react-redux';
import Feedback from '../../components/student-module/feedback';


const mapStateToProps = (state) => ({
    ranking: state.feedback.ranking,
    quizzes: state.feedback.quizzes,
    participation: state.feedback.participation
});


const StudentFeedbackContainer = connect(mapStateToProps)(Feedback);
export default StudentFeedbackContainer;
