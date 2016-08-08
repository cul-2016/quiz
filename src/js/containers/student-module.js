import { connect } from 'react-redux';
import StudentModule from '../components/module/student-module';
import { socketClient } from '../socket';
import { store } from '../store.js';
import { listenForModuleID } from '../lib/subscriptions';

listenForModuleID(store, socketClient);

const mapStateToProps = (state) => ({

    isFetchingModule: state.module.isFetchingModule,
    username: state.user.username,
    isLiveQuiz: state.module.isLiveQuiz,
    quiz_id: state.liveQuiz.quiz_id,
    question: state.liveQuiz.question,
    response: state.liveQuiz.response
});

const mapDispatchToProps = (dispatch) => ({
    dispatch
});


const StudentModuleContainer = connect(mapStateToProps, mapDispatchToProps)(StudentModule);

export default StudentModuleContainer;
