import { connect } from 'react-redux';
import { updateMedalValues, updateTrophyValues, toggleDisableTrophies, updateTextValues, validateModuleID, addNewModule } from '../actions/new-module';
import NewModule from '../components/new-module/new-module';
import { store } from '../store';
import { hashHistory } from 'react-router';

const mapStateToProps = (state) => ({
    medals: state.newModule.medals,
    trophies: state.newModule.trophies,
    moduleIDExists: state.newModule.moduleIDExists,
    isValidatingModuleID: state.newModule.isValidatingModuleID,
    module_id: state.newModule.module_id,
    name: state.newModule.name,
    username: state.user.username,
    isMoodleModule: state.newModule.isMoodleModule
});

const mapDispatchToProps = (dispatch) => ({

    handleInputChange: (inputKey, value) => {

        dispatch(updateTextValues(inputKey, value));
    },

    handleCodeInputChange: (inputKey, id) => {
        const REQUIRED_ID_LENGTH = 4;
        const upperCaseValue = id.toUpperCase();

        if (id.length === REQUIRED_ID_LENGTH) {

            dispatch(validateModuleID(upperCaseValue));
        }

        dispatch(updateTextValues(inputKey, upperCaseValue));
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

    toggleDisableTrophies: () => {

        dispatch(toggleDisableTrophies());
    },

    submit: () => {

        if (!store.getState().newModule.validationProblem) {

            let currentState = store.getState().newModule;
            let data = Object.assign(
                {},
                { module_id: currentState.module_id },
                { name: currentState.name },
                { trophies: currentState.trophies },
                { uses_trophies: !currentState.trophiesDisabled },
                {
                    medals: {
                        medal_name: ["bronze", "silver", "gold"],
                        condition: currentState.medals
                    }
                }
            );
            dispatch(addNewModule(data));
            setTimeout(() => {
                hashHistory.push('/dashboard');
            }, 300);
        }
    }
});

const NewModuleContainer = connect(mapStateToProps, mapDispatchToProps)(NewModule);

export default NewModuleContainer;
