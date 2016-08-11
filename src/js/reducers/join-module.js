import update from 'react-addons-update';
import * as actionsTypes from '../actions/join-module';


const initialState = {
    module_id: undefined,
    isJoiningModule: false,
    error: undefined
};

export default function joinModule (state = initialState, action) {

    switch (action.type) {

    case actionsTypes.INPUT_CHANGE:
        return update(state, {
            module_id: { $set: action.value }
        });

    case actionsTypes.JOIN_MODULE_REQUEST:
        return update(state, {
            isJoiningModule: { $set: true }
        });

    case actionsTypes.JOIN_MODULE_SUCCESS:
        return update(state, {
            isJoiningModule: { $set: false },
        });

    case actionsTypes.JOIN_MODULE_FAILURE:
        return update(state, {
            isJoiningModule: { $set: false },
            error: { $set: action.error }
        });

    default:
        return state;
    }
}
