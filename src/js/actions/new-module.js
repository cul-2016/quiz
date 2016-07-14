export const UPDATE_MEDAL_VALUES = 'UPDATE_MEDAL_VALUES';


export const updateMedalValues = (medal, value) => ({
    type: UPDATE_MEDAL_VALUES,
    medal,
    value
});
