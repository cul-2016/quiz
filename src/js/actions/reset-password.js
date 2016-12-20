export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const UPDATE_CONFIRMED_PASSWORD = 'UPDATE_CONFIRMED_PASSWORD';

const basicUpdate = (type) => (value) => ({ type, value });

export const updateEmail = basicUpdate(UPDATE_EMAIL);
export const updatePassword = basicUpdate(UPDATE_PASSWORD);
export const updateConfirmedPassword = basicUpdate(UPDATE_CONFIRMED_PASSWORD);
