import { connect } from 'react-redux';
import History from '../../components/student-module/history';


const mapStateToProps = (state) => ({
    history: state.studentHistory.history,
    medalConditions: state.module.medals.condition
});


const StudentHistoryContainer = connect(mapStateToProps)(History);
export default StudentHistoryContainer;
