import update from 'react-addons-update';
import * as actionTypes from '../actions/new-module';


const initialState = {
    module_id: "",
    name: "",
    medals: [39, 69],
    trophies: {
        trophy_name: [
            "participation",
            "overall_score",
            "high_score",
            "first_quiz"
        ],
        condition: [3, 10, 100, 1]
    },
    error: undefined,
    moduleIDExists: undefined,
    validationProblem: false,
    isValidatingModuleID: false,
    isSavingModule: undefined
};

export default function newModule (state = initialState, action) {

    switch (action.type) {

    case actionTypes.VALIDATE_MODULE_ID_REQUEST:
        return update(state, {
            isValidatingModuleID: { $set: true }
        });

    case actionTypes.VALIDATE_MODULE_ID_SUCCESS:
    case actionTypes.VALIDATE_MODULE_ID_FAILURE:
        return handleValidateModule(state, action);

    case actionTypes.UPDATE_TEXT_VALUES:
        return update(state, {
            [action.inputKey]: { $set: action.value }
        });

    case actionTypes.UPDATE_MEDAL_VALUES:
        return updateMedalValues(state, action);

    case actionTypes.UPDATE_TROPHY_VALUES:
        return updateTrophyValues(state, action);

    case actionTypes.ADD_NEW_MODULE_REQUEST:
        return update(state, {
            isSavingModule: { $set: true }
        });

    case actionTypes.ADD_NEW_MODULE_SUCCESS:
    case actionTypes.ADD_NEW_MODULE_FAILURE:
        return update(state, {
            isSavingModule: { $set: false },
            error: { $set: action.error }
        });

    default:
        return state;
    }
}

function handleValidateModule (state, action) {

    return update(state, {
        isValidatingModuleID: { $set: false },
        moduleIDExists: { $set: action.moduleIDExists },
        error: { $set: action.error }
    });
}

function updateMedalValues (state, action) {

    let newValue, index, offset;

    switch (action.medal) {

    case 'bronze':
        offset = 1;
        index = 0;
        break;

    case 'gold':
        offset = -1;
        index = 1;
        break;
    }
    newValue = action.value === "" ? "-" : action.value + offset;

    return update(state, {
        medals: { $splice: [[index, 1, newValue]] }
    });
}

function updateTrophyValues (state, action) {

    let index = state.trophies.trophy_name.indexOf(action.trophy);

    if (index === -1) {
        return state;
    }
    return update(state, {
        trophies: {
            condition: { $splice: [[index, 1, action.value]] }
        }
    });
}
