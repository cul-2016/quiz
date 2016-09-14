import { connect } from 'react-redux';
import History from '../../components/student-module/history';


const mapStateToProps = (state) => ({ //eslint-disable-line no-unused-vars
    // history: state.studentHistory.history
});


const StudentHistoryContainer = connect(mapStateToProps)(History);
export default StudentHistoryContainer;
