import { connect } from 'react-redux';
import LiveQuiz from '../../components/live-quiz/live-quiz';
import { setResponse, saveResponse } from '../../actions/live-quiz';
import { store } from '../../store';
import { joinWebsocketRoom } from '../../lib/subscriptions';
import { socketClient } from '../../socket';

joinWebsocketRoom(store, socketClient);

const mapStateToProps = (state) => ({
    question: state.liveQuiz.questions && state.liveQuiz.questions[0],
    is_lecturer: state.user.is_lecturer,
    isQuizStarted: state.liveQuiz.isQuizStarted,
    isSavingResponse: state.liveQuiz.isSavingResponse,
    isResponseSubmitted: state.liveQuiz.isResponseSubmitted,
    response: state.liveQuiz.response,
    name: state.liveQuiz.name
});

const mapDispatchToProps = (dispatch) => ({

    submitResponse: () => {
        let data = {
            user_id: store.getState().user.user_id,
            id: store.getState().liveQuiz.quiz_id,
            isSurvey: store.getState().liveQuiz.isSurvey,
            question_id: store.getState().liveQuiz.questions[0].question_id,
            response: store.getState().liveQuiz.response
        };

        dispatch(saveResponse(data));
    },
    handleSelection: (data) => {
        dispatch(setResponse(data));

        let responseData = {
            user_id: store.getState().user.user_id,
            id: store.getState().liveQuiz.quiz_id,
            isSurvey: store.getState().liveQuiz.isSurvey,
            question_id: store.getState().liveQuiz.questions[0].question_id,
            response: data
        };

        dispatch(saveResponse(responseData));
    }
});

const StudentLiveQuizContainer = connect(mapStateToProps, mapDispatchToProps)(LiveQuiz);

export default StudentLiveQuizContainer;
