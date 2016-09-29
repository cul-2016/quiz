import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/root-reducer';
import { loadState, saveState } from './lib/localStorageState';
import throttle from 'lodash/throttle';

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


const persistedState = loadState();
export const store = initStore(persistedState);


store.subscribe(throttle(() => {
    saveState({
        user: store.getState().user,
        module: store.getState().module,
        liveQuiz: store.getState().liveQuiz,
        newQuiz: store.getState().newQuiz
    });
}, 2000));
