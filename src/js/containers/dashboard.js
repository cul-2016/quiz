import { connect } from 'react-redux';
import Dashboard from '../components/dashboard';
import { inputChange, joinModule, clearJoinModule } from '../actions/join-module';
import { validateModuleID } from '../actions/new-module';
import { store } from '../store';


const mapStateToProps = (state) => ({

    modules: state.dashboard.data,
    is_lecturer: state.user.is_lecturer,
    module_id: state.joinModule.module_id,
    moduleIDExists: state.newModule.moduleIDExists
});

const mapDispatchToProps = (dispatch) => ({

    handleInputChange: (value) => {
        const upperCaseValue = value.toUpperCase();

        dispatch(inputChange(upperCaseValue));

        if (value && value.length === 4) {
            dispatch(validateModuleID(upperCaseValue));
        }
    },
    handleJoinModule: () => {
        let module_id = store.getState().joinModule.module_id;

        dispatch(joinModule(module_id));
        dispatch(clearJoinModule());
    }
});

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardContainer;
