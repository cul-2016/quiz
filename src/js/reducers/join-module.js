import update from 'react-addons-update';
import * as actionTypes from '../actions/join-module';


const initialState = {
    module_id: undefined,
};

export default function joinModule (state = initialState, action) {

    switch (action.type) {

    case actionTypes.INPUT_CHANGE:
        return update(state, {
            module_id: { $set: action.value }
        });

    default:
        return state;
    }
}
