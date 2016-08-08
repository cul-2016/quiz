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

    startQuiz: (quiz_id) => { // eslint-disable-line
        let module_id = store.getState().module.module.module_id;
        // run socket quiz_start emitter
        socketClient.emit('start_quiz', module_id, (msg) => {
            console.log(msg);
            //dispatch to fetch the questions for the given quiz
            // take user to the given enpoint
        });
    }
});


const ModuleContainer = connect(mapStateToProps, mapDispatchToProps)(Module);

export default ModuleContainer;
