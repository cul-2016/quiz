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

const mapDispatchToProps = (dispatch) => ({
    dispatch
});


const ModuleContainer = connect(mapStateToProps, mapDispatchToProps)(Module);

export default ModuleContainer;
