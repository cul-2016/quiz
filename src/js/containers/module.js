import { connect } from 'react-redux';
import Module from '../components/module/module';
import { socketClient } from '../socket';
import { store } from '../store.js';
import { joinWebsocketRoom } from '../lib/subscriptions';

joinWebsocketRoom(store, socketClient);

const mapStateToProps = (state) => ({
    module: state.module.module,
    quizzes: state.module.quizzes,
    isFetchingModule: state.module.isFetchingModule,
    username: state.user.username
});

const mapDispatchToProps = (dispatch) => ({ // eslint-disable-line

    sendQuizInvite: (quiz_id) => {

        let quizInfo = {
            room: store.getState().module.module.module_id,
            quiz_id
        };
        console.log(quizInfo);
        socketClient.emit('send_quiz_invite', quizInfo, (msg) => {
            console.log(msg);
        });
    }
});


const ModuleContainer = connect(mapStateToProps, mapDispatchToProps)(Module);

export default ModuleContainer;
