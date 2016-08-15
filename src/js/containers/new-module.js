import { connect } from 'react-redux';
import { updateMedalValues, updateTrophyValues, updateTextValues, validateModuleID, addNewModule } from '../actions/new-module';
import NewModule from '../components/new-module/new-module';
import { store } from '../store';
import { hashHistory } from 'react-router';


const mapStateToProps = (state) => ({
    medals: state.newModule.medals,
    trophies: state.newModule.trophies,
    moduleIDExists: state.newModule.moduleIDExists,
    module_id_length: state.newModule.module_id.length,
    isValidatingModuleID: state.newModule.isValidatingModuleID
});

const mapDispatchToProps = (dispatch) => ({

    handleInputChange: (inputKey, value) => {

        dispatch(updateTextValues(inputKey, value));
    },

    handleCodeInputChange: (inputKey, id) => {

        if (id.length === 4) {

            dispatch(validateModuleID(id));
        }
        dispatch(updateTextValues(inputKey, id));
    },

    updateMedalVals: (medal, value) => {

        if (value !== "") {
            value = parseInt(value, 10);
        }
        dispatch(updateMedalValues(medal, value));
    },

    updateTrophyVals: (trophy, value) => {

        dispatch(updateTrophyValues(trophy, value));
    },

    submit: () => {

        if (!store.getState().newModule.validationProblem) {

            let currentState = store.getState().newModule;
            let data = Object.assign(
                {},
                { module_id: currentState.module_id },
                { name: currentState.name },
                { trophies: currentState.trophies },
                {
                    medals: {
                        medal_name: ["bronze", "silver", "gold"],
                        condition: currentState.medals
                    }
                }
            );
            dispatch(addNewModule(data));
            hashHistory.push('/dashboard');
        }
    }
});

const NewModuleContainer = connect(mapStateToProps, mapDispatchToProps)(NewModule);

export default NewModuleContainer;
