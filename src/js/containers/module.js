import { connect } from 'react-redux';
import Module from '../components/module/module';
import { socketClient } from '../socket';
import { store } from '../store.js';
import { joinWebsocketRoom } from '../lib/subscriptions';
import sendQuizInvite from '../lib/sendQuizInvite';
import { setIntervalID } from '../actions/live-quiz';

joinWebsocketRoom(store, socketClient);

const mapStateToProps = (state) => ({
    module: state.module.module,
    quizzes: state.module.quizzes,
    isFetchingModule: state.module.isFetchingModule,
    username: state.user.username
});

const mapDispatchToProps = (dispatch) => ({

    sendQuizInvite: (quiz_id) => {

        let quizInfo = {
            room: store.getState().module.module.module_id,
            quiz_id
        };
        console.log("sending quiz invite");
        const interval_id = sendQuizInvite(socketClient, quizInfo);
        dispatch(setIntervalID(interval_id));
    }
});


const ModuleContainer = connect(mapStateToProps, mapDispatchToProps)(Module);

export default ModuleContainer;
