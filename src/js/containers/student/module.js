import { connect } from 'react-redux';
import StudentModule from '../../components/student-module/module';
import { socketClient } from '../../socket';
import { store } from '../../store.js';
import { joinWebsocketRoom } from '../../lib/subscriptions';

joinWebsocketRoom(store, socketClient);

const mapStateToProps = (state) => {

    return {

        isFetchingModule: state.module.isFetchingModule,
        username: state.user.username,
        isQuizOpen: state.module.isQuizOpen,
        quiz_id: state.liveQuiz.quiz_id,
        question: state.liveQuiz.question,
        response: state.liveQuiz.response
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch
});


const StudentModuleContainer = connect(mapStateToProps, mapDispatchToProps)(StudentModule);

export default StudentModuleContainer;
