import { trophies } from './data-fixtures';

export const dashboard = {
    isFetchingDashboard: false,
    data: [],
    error: undefined
};

export const newModule = {
    module_id: undefined,
    name: undefined,
    medals: [39, 69],
    trophies,
    error: undefined,
    isValidatingModuleID: false,
    validationProblem: false,
    moduleIDExists: undefined,
    isSavingModule: undefined
};

export const login = {
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

export const register = {
    email: "",
    username: "",
    password: "",
    isRegistering: false,
    error: undefined,
    userIsRegistered: undefined,
    userExists: false
};

export const module = {
    module: undefined,
    quizzes: undefined,
    isFetchingModule: false,
    error: undefined,
    isLiveQuiz: false
};

export const liveQuiz = {
    quiz_id: undefined,
    question: undefined,
    response: undefined
};

export const newQuiz = {
    name: undefined,
    questions: [],
    isSavingQuiz: false,
    error: undefined
};

export const newQuizWithQuestion = {
    name: undefined,
    questions: [{
        question: undefined,
        A: undefined,
        B: undefined,
        C: undefined,
        D: undefined,
        correct_answer: undefined
    }],
    isSavingQuiz: false,
    error: undefined
};