import { connect } from 'react-redux';
import JoinModule from '../components/join-module';
import { inputChange, joinModule } from '../actions/join-module';
import { validateModuleID } from '../actions/new-module';
import { store } from '../store';

const mapStateToProps = (state) => ({
    module_id: state.joinModule.module_id,
    moduleIDExists: state.newModule.moduleIDExists
});

const mapDispatchToProps = (dispatch) => ({

    handleInputChange: (value) => {
        const upperCaseValue = value.toUpperCase();
        console.log(upperCaseValue);
        dispatch(inputChange(upperCaseValue));

        if (value && value.length === 4) {
            dispatch(validateModuleID(upperCaseValue));
        }
    },
    handleJoinModule: () => {
        let module_id = store.getState().joinModule.module_id;
        const user_id = store.getState().user.user_id;
        console.log(module_id, user_id);
        dispatch(joinModule(module_id, user_id));
    }

});

const JoinModuleContainer = connect(mapStateToProps, mapDispatchToProps)(JoinModule);

export default JoinModuleContainer;
