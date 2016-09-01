import { store } from '../store';
import isEqual from 'lodash/isEqual';


export default function getNewTrophies () {

    const newTrophyState = store.getState().result.newTrophyState;
    const oldTrophyState = store.getState().module.trophies_awarded;
    const trophyNames = Object.keys(store.getState().module.trophies_awarded).sort();


    if (isEqual(oldTrophyState, newTrophyState)) {
        return [];
    } else {
        return newTrophyState.reduce((acc, trophy, i) => {

            if (trophy) {
                acc.push(trophyNames[i]);
            }
            return acc;
        }, []);
    }
}
