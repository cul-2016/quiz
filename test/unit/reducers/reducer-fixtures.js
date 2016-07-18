export const dashboard = {
    isFetchingDashboard: false,
    data: [],
    error: undefined
};

export const newModule = {
    module_id: undefined,
    name: undefined,
    medals: [39, 69],
    trophies: undefined
};

export const signup = {
    email: "",
    password: "",
    isAuthenticating: false,
    userIsAuthenticated: undefined,
    error: undefined
};

export const user = {
    user_id: undefined,
    email: undefined,
    username: undefined,
    is_lecturer: undefined,
    isFetchingUser: false,
    error: undefined
};

export const userDetails = {
    user_id: 1,
    email: 'test@test.com',
    username: 'test',
    is_lecturer: true
};
