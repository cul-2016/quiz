export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';


export const updateEmail = (value) => ({
    type: UPDATE_EMAIL,
    value
});

export const updatePassword = (value) => ({
    type: UPDATE_PASSWORD,
    value
});
