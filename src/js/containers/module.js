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
    surveys: state.module.surveys,
    isFetchingModule: state.module.isFetchingModule
});

const mapDispatchToProps = (dispatch) => ({

    sendQuizInvite: (quiz_id, survey_id, name) => {
        const quizIdOrSurveyId = quiz_id || survey_id;
        let quizInfo = {
            room: store.getState().module.module_id,
            quiz_id: quizIdOrSurveyId
        };
        console.log(quiz_id);

        const interval_id = emitSendQuizInvite(socketClient, quizInfo);
        dispatch(setIntervalID(interval_id));
        dispatch(setQuizDetails(quizIdOrSurveyId, name));
        dispatch(getQuizQuestions(quiz_id, survey_id));
    }
});


const ModuleContainer = connect(mapStateToProps, mapDispatchToProps)(Module);

export default ModuleContainer;
