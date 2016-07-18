export const UPDATE_MEDAL_VALUES = 'UPDATE_MEDAL_VALUES';
export const UPDATE_TROPHY_VALUES = 'UPDATE_TROPHY_VALUES';


export const updateMedalValues = (medal, value) => ({
    type: UPDATE_MEDAL_VALUES,
    medal,
    value
});

export const updateTrophyValues = (trophy, value) => ({
    type: UPDATE_TROPHY_VALUES,
    trophy,
    value
});
