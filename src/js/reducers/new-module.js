import update from 'react-addons-update';
import * as actionsTypes from '../actions/new-module';

const initialState = {
    module_id: undefined,
    name: undefined,
    medals: [39, 69],
    trophies: undefined
};

export default function newModule (state = initialState, action) {

    switch (action.type) {

    case actionsTypes.UPDATE_MEDAL_VALUES:
        return updateMedalValues(state, action);

    default:
        return state;
    }
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
