import { connect } from 'react-redux';
import { updateMedalValues, updateTrophyValues, validateModuleID, addNewModule } from '../actions/new-module';
import NewModule from '../components/new-module';
import { store } from '../store';


const mapStateToProps = (state) => ({
    medals: state.newModule.medals,
    trophies: state.newModule.trophies,
    moduleIDExists: state.newModule.moduleIDExists
});

const mapDispatchToProps = (dispatch) => ({

    updateMedalVals: (medal, value) => {

        if (value !== "") {
            value = parseInt(value, 10);
        }
        dispatch(updateMedalValues(medal, value));
    },
    updateTrophyVals: (trophy, value) => {

        dispatch(updateTrophyValues(trophy, value));
    },
    validateID: (id) => {

        if (id.length === 4) {

            dispatch(validateModuleID(id));
        }
    },
    validateFormEntries: () => {

        if (!store.getState().newModule.validationProblem) {
            let data = Object.assign({}, store.getState().newModule);
            delete data.validationProblem;
            dispatch(addNewModule(data));
        }
    }
});

const NewModuleContainer = connect(mapStateToProps, mapDispatchToProps)(NewModule);

export default NewModuleContainer;
