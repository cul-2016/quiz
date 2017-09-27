import { connect } from 'react-redux';
import Module from '../components/module/module.js';
import { socketClient } from '../socket';
import { store } from '../store.js';
import { joinWebsocketRoom } from '../lib/subscriptions';
import emitSendQuizInvite from '../lib/emitSendQuizInvite.js';
import { generateShareId } from '../actions/module.js';
import { updateImportCode, submitImportCode } from '../actions/module.js';
import {
    setIntervalID,
    getQuizQuestions,
    setQuizDetails,
    setIsSurvey
} from '../actions/live-quiz.js';

joinWebsocketRoom(store, socketClient);

const mapStateToProps = (state) => ({
    module: {
        module_id: state.module.module_id,
        name: state.module.name,
        medals: state.module.medals,
        trophies: state.module.trophies,
        num_enrolled: state.module.num_enrolled,
        importCode: state.module.importCode,
        isSubmittingImportCode: state.module.isSubmittingImportCode,
        error: state.module.error
    },
    quizzes: state.module.quizzes,
    surveys: state.module.surveys,
    isFetchingModule: state.module.isFetchingModule
});

const mapDispatchToProps = (dispatch) => ({

    sendQuizInvite: (quiz_id, survey_id, name, review = false) => {

        const quizIdOrSurveyId = quiz_id || survey_id;
        let quizInfo = {
            room: store.getState().module.module_id,
            quiz_id: quizIdOrSurveyId,
            survey_id: survey_id
        };

        if (!review) {
            const interval_id = emitSendQuizInvite(socketClient, quizInfo);
            dispatch(setIntervalID(interval_id));
        }
        dispatch(setQuizDetails(quizIdOrSurveyId, name, review));
        dispatch(getQuizQuestions(quiz_id, survey_id));
        dispatch(setIsSurvey(quiz_id, survey_id));
    },

    handleSetIsSurvey: (quiz_id, survey_id) => {
        dispatch(setIsSurvey(quiz_id, survey_id));
    },
    handleGenerateShareId: (quiz_id, survey_id, module_id) => {
        dispatch(generateShareId(quiz_id, survey_id, module_id));
    },
    handleImportCode: (importCode) => {
        dispatch(updateImportCode(importCode));
    },
    handleSubmitImportCode: (importCode, module_id) => {
        dispatch(submitImportCode(importCode, module_id));
    }
});


const ModuleContainer = connect(mapStateToProps, mapDispatchToProps)(Module);

export default ModuleContainer;
