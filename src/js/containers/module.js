import { connect } from 'react-redux';
import Module from '../components/module/module';
import { socketClient } from '../socket';
import { store } from '../store.js';
import { joinWebsocketRoom } from '../lib/subscriptions';
import emitSendQuizInvite from '../lib/emitSendQuizInvite';
import { setIntervalID, getQuizQuestions, setQuizDetails } from '../actions/live-quiz';

joinWebsocketRoom(store, socketClient);

const mapStateToProps = (state) => ({
    module: {
        module_id: state.module.module_id,
        name: state.module.name,
        medals: state.module.medals,
        trophies: state.module.trophies,
        num_enrolled: state.module.num_enrolled
    },
    quizzes: state.module.quizzes,
    isFetchingModule: state.module.isFetchingModule
});

const mapDispatchToProps = (dispatch) => ({

    sendQuizInvite: (quiz_id, name) => {

        let quizInfo = {
            room: store.getState().module.module_id,
            quiz_id
        };

        const interval_id = emitSendQuizInvite(socketClient, quizInfo);
        dispatch(setIntervalID(interval_id));
        dispatch(setQuizDetails(quiz_id, name));
        dispatch(getQuizQuestions(quiz_id));
    }
});


const ModuleContainer = connect(mapStateToProps, mapDispatchToProps)(Module);

export default ModuleContainer;
