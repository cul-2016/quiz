import { connect } from 'react-redux';
import StudentModule from '../components/module/student-module';
import { socketClient } from '../socket';
import { store } from '../store.js';
import { listenForModuleID } from '../lib/subscriptions';

listenForModuleID(store, socketClient);

const mapStateToProps = (state) => ({
    module: state.module.module,
    quizzes: state.module.quizzes,
    isFetchingModule: state.module.isFetchingModule,
    username: state.user.username
});

const mapDispatchToProps = (dispatch) => ({
    dispatch
});


const StudentModuleContainer = connect(mapStateToProps, mapDispatchToProps)(StudentModule);

export default StudentModuleContainer;
