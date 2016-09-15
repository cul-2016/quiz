import isEqual from 'lodash/isEqual'; //does deep comparison

/**
 * Gets the new trophies for a student
 * Returns an array of trophies, or null
 * @param {object} oldTrophyState - oldTrophyState from module state
 * @param {object} newTrophyState - newTrophyState from result state
 */

export default function getNewTrophies (oldTrophyState, newTrophyState) {

    const trophyNames = Object.keys(oldTrophyState);

    if (isEqual(oldTrophyState, newTrophyState)) {
        return null;
    } else {
        return Object.keys(newTrophyState).reduce((acc, trophy, i) => {

            if (newTrophyState[trophy] && !oldTrophyState[trophy]) {
            
                acc.push(trophyNames[i]);
            }
            return acc;
        }, []);
    }
}
