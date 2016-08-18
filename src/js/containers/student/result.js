import { connect } from 'react-redux';
import Result from '../../components/student-module/result';


const mapStateToProps = (state) => ({

    score: state.result.score
});

const StudentQuizResultContainer = connect(mapStateToProps)(Result);

export default StudentQuizResultContainer;
