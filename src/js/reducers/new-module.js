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

    if (action.medal === 'bronze') {
        return update(state, {
            medals: { $splice: [[0, 1, action.value + 1]] }
        });
    }
    if (action.medal === 'gold') {
        return update(state, {
            medals: { $splice: [[1, 1, action.value - 1]] }
        });
    }
}
