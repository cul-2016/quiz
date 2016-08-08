import { connect } from 'react-redux';
import Module from '../components/module/module';
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

const mapDispatchToProps = (dispatch) => ({ // eslint-disable-line

    startQuiz: (quiz_id) => {

        let quizInfo = {
            room: store.getState().module.module.module_id,
            // room: 'TEST',
            quiz_id
        };

        socketClient.emit('lecturer_start_quiz', quizInfo, (msg) => {
            console.log(msg);
            //dispatch to fetch the questions for the given quiz

            // once we have the question
            // take user to the given endpoint

        });
    }
});


const ModuleContainer = connect(mapStateToProps, mapDispatchToProps)(Module);

export default ModuleContainer;
