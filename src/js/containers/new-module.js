import { connect } from 'react-redux';
import { updateMedalValues, updateTrophyValues, updateTextValues, validateModuleID, addNewModule } from '../actions/new-module';
import NewModule from '../components/new-module';
import { store } from '../store';


const mapStateToProps = (state) => ({
    medals: state.newModule.medals,
    trophies: state.newModule.trophies,
    moduleIDExists: state.newModule.moduleIDExists
});

const mapDispatchToProps = (dispatch) => ({

    handleInputChange: (inputKey, value) => {

        // dispatch
        dispatch(updateTextValues(inputKey, value));
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
    validateID: (id) => {

        if (id.length === 4) {

            dispatch(validateModuleID(id));
        }
    },
    submit: () => {

        // data validation should happen here
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
        }
    }
});

const NewModuleContainer = connect(mapStateToProps, mapDispatchToProps)(NewModule);

export default NewModuleContainer;
