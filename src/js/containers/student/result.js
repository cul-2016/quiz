import { connect } from 'react-redux';
import Result from '../../components/student-module/result';
import getNewTrophies from '../../lib/getNewTrophies';


const mapStateToProps = (state) => ({
    newTrophies: state.result.trophies_awarded && getNewTrophies(),
    score: state.result.score
});

const StudentQuizResultContainer = connect(mapStateToProps)(Result);

export default StudentQuizResultContainer;
