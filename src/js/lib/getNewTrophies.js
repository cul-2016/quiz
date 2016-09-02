import isEqual from 'lodash/isEqual';

/**
 * Gets the new trophies for a student
 * Returns an array of trophies, or null
 * @param {object} store - Redux store
 */

export default function getNewTrophies (store) {

    const oldTrophyState = store.getState().module.trophies_awarded;
    const newTrophyState = store.getState().result.newTrophyState;
    const trophyNames = Object.keys(store.getState().module.trophies_awarded).sort();

    if (isEqual(oldTrophyState, newTrophyState)) {
        return null;
    } else {
        return newTrophyState.reduce((acc, trophy, i) => {

            if (trophy) {
                acc.push(trophyNames[i]);
            }
            return acc;
        }, []);
    }
}
