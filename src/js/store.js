import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/root-reducer';
import { saveUserState, loadUserState } from './lib/userState';


export function initStore (initialState) {

    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunkMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
}

const persistedState = loadUserState();

export const store = initStore(persistedState);

store.subscribe(() => {
    saveUserState({
        user: store.getState().user
    });
});
