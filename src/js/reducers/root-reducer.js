import { combineReducers } from 'redux';

let initialState = 0;

function fakeReducer (state = initialState, action) {

    if (action) {

        return state;
    }
}

export default combineReducers({
    fakeReducer
});
