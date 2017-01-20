import { connect } from 'react-redux';
import StudentModule from '../../components/student-module/module';
import { socketClient } from '../../socket';
import { store } from '../../store.js';
import { joinWebsocketRoom } from '../../lib/subscriptions';

joinWebsocketRoom(store, socketClient);

const mapStateToProps = (state) => {

    return {

        isFetchingModule: state.module.isFetchingModule,
        trophies: state.module.trophies_awarded && Object.keys(state.module.trophies_awarded).sort(),
        trophies_awarded: state.module.trophies_awarded,
        username: state.user.username,
        isQuizOpen: state.module.isQuizOpen,
        quiz_id: state.liveQuiz.quiz_id,
        question: state.liveQuiz.question,
        response: state.liveQuiz.response,
        module: state.module
    };
};

const mapDispatchToProps = () => ({

    handleJoiningQuiz: (module_id) => {

        socketClient.emit('student_joined_quiz', module_id, (msg) => {
            console.log(msg);
        });
    }

});


const StudentModuleContainer = connect(mapStateToProps, mapDispatchToProps)(StudentModule);

export default StudentModuleContainer;
