const users = [{
    user_id: 1,
    email: 'student@city.ac.uk',
    password: '$2a$10$UnvUuW91Jh6.zWQi3G/2J.HLDTomSqJHxvBC.TYx/Bj8HZa.AAm4K',
    is_lecturer: false,
    is_super_admin: false,
    username: 'student',
    group_code: null,
    is_verified: true,
    verification_code: null,
    reset_password_code: null,
    expiry_code: null,
    trial_expiry_time: null,
    group_admin_has_paid: null,
    is_group_admin: false,
    account_type: null,
    paid: null,
    is_user_active: true,
    moodle_id: null
}];

const usersById = [{
    user_id: 1,
    email: 'student@city.ac.uk',
    password: '$2a$10$UnvUuW91Jh6.zWQi3G/2J.HLDTomSqJHxvBC.TYx/Bj8HZa.AAm4K',
    is_lecturer: false,
    is_super_admin: false,
    username: 'student',
    group_code: null,
    is_verified: true,
    verification_code: null,
    reset_password_code: null,
    expiry_code: null,
    trial_expiry_time: null,
    group_admin_has_paid: null,
    is_group_admin: false,
    is_user_active: true,
    moodle_id: null
}];


const userDetails = {
    user_id: 1,
    email: 'test@test.com',
    username: 'test',
    is_lecturer: true,
    is_verified: true,
    expiry_code: null,
    verification_code: null
};

const feedback = {
    ranking: 25,
    quizzes: ['Week 3 quiz', 'Week 1 quiz'],
    participation: 50
};

const dashboardData = [
    {
        module_id: 'CS50',
        name: 'Intro to Computer Science'
    }
];

const medals = {
    medal_name: [
        "bronze",
        "silver",
        "gold"
    ],
    condition: [39, 69]
};

const trophies = {
    trophy_name: [
        "participation",
        "overall_average",
        "high_score",
        "first_quiz"
    ],
    condition: [3, 60, 100, 1]
};

const newModule = Object.assign({}, dashboardData[0], { medals }, { trophies });


const quizzes = [
    {
        quiz_id: 2,
        name: 'Pop quiz',
        numQuestions: 10,
        numEntries: 121,
        isPresented: false
    },
    {
        quiz_id: 5,
        name: 'Awesome quiz',
        numQuestions: 18,
        numEntries: 11,
        isPresented: true
    }
];

const _module = Object.assign({}, newModule, { quizzes });

const expectedLecturer = {
    module_id: 'TEST',
    name: 'test module',
    owner: 2,
    medals: {
        medal_name: ["bronze", "silver", "gold"],
        condition: [39, 69]
    },
    trophies: {
        trophy_name: [
            "first_quiz",
            "high_score",
            "overall_score",
            "participation"
        ],
        condition: [1, 100, 2, 2]
    },
    num_enrolled: 5,
    quizzes: [{
        quiz_id: 1,
        name: 'Week 1 Quiz',
        num_questions: '2',
        num_entries: '4',
        is_presented: true,
        is_last_quiz: false,
        share_id: 'testingsharecodeforquiz'
    }, {
        quiz_id: 2,
        name: 'Week 2 Quiz',
        num_questions: '3',
        num_entries: '3',
        is_presented: true,
        is_last_quiz: false,
        share_id: null
    }],
    surveys: [{
        survey_id: 1,
        name: 'Week 1 Survey',
        is_presented: true,
        num_entries: '4',
        num_questions: '2',
        share_id: 'testingsharecodeforsurvey'
    }, {
        survey_id: 2,
        name: 'Week 2 Survey',
        is_presented: true,
        num_entries: '4',
        num_questions: '2',
        share_id: null
    }]
};

const expectedStudent = {

    module_id: 'TEST',
    name: 'test module',
    medals: {
        medal_name: ["bronze", "silver", "gold"],
        condition: [39, 69]
    },
    trophies_awarded: {
        first_quiz: false,
        high_score: false,
        overall_average: false,
        participation: false
    }
};


const newQuiz = {
    name: undefined,
    questions: [
        {
            question: 'capital of England',
            a: 'London',
            b: 'Tokyo',
            c: 'New York',
            d: 'Paris',
            correct_answer: 'a'
        }
    ],
    isSavingQuiz: false,
    error: undefined
};

const getQuizDetailsData = {
    name: 'Old Quiz',
    is_last_quiz: false,
    questions: [
        {
            question: 'capital of England',
            a: 'London',
            b: 'Tokyo',
            c: 'New York',
            d: 'Paris',
            correct_answer: 'a'
        }
    ]
};

const questions = [
    {
        question: 'capital of England',
        a: 'London',
        b: 'Tokyo',
        c: 'New York',
        d: 'Paris',
        correct_answer: 'a',
        order_id: 1,
        more_information: null
    }
];

const questionsAnswers = [
    {
        question: 'capital of England',
        a: 'London',
        b: 'Tokyo',
        c: 'New York',
        d: 'Paris',
        correct_answer: 'a',
        response: 'b'
    }
];

const reviewQuestions = [
    {
        quiz_id: 1,
        question_id: 1,
        question: 'What is the capital of England?',
        a: 'London',
        b: 'Cardiff',
        c: 'Edinburgh',
        d: 'Doncaster',
        correct_answer: 'a',
        a_response: '2',
        b_response: '0',
        c_response: '0',
        d_response: '0'
    },
    {
        quiz_id: 1,
        question_id: 2,
        question: 'What is the capital of Croatia?',
        a: 'Zagreb',
        b: 'Cardiff',
        c: 'Edinburgh',
        d: 'Doncaster',
        correct_answer: 'a',
        a_response: '1',
        b_response: '0',
        c_response: '0',
        d_response: '0'
    }
];

const liveQuizQuestions = [
    {
        question_id: 1,
        question: 'capital of England',
        a: 'London',
        b: 'Tokyo',
        c: 'New York',
        d: 'Paris'
    }
];

const nextQuestion = {
    quiz_id: 1,
    nextQuestion: {
        question_id: 1,
        question: 'capital of England',
        a: 'London',
        b: 'Tokyo',
        c: 'New York',
        d: 'Paris'
    }
};

const getModuleMembers = [{
    email: 'student@city.ac.uk',
    user_id: 1,
    username: 'student'
}];

const getQuizMembers = [{
    user_id: 1,
    quiz_id: 1,
    score: 5
}];

const getQuizIDListData = [
    { quiz_id: 1 },
    { quiz_id: 2 }
];

const getScoresForLeaderboardData = [
    { quiz_id: 1, percentage_score: 100, user_id: 1 },
    { quiz_id: 2, percentage_score: 33, user_id: 1 },
    { quiz_id: 1, percentage_score: 50, user_id: 3 },
    { quiz_id: 2, percentage_score: 33, user_id: 3 },
    { quiz_id: 1, percentage_score: 0, user_id: 4 },
    { quiz_id: 1, percentage_score: 100, user_id: 5 },
    { quiz_id: 2, percentage_score: 33, user_id: 5 }
];

const getTotalScoresAndTrophiesData = [
    {
        first_quiz: false,
        high_score: false,
        overall_score: false,
        participation: false,
        total_score: 3,
        user_id: 5,
        username: 'Homer'
    }, {
        first_quiz: false,
        high_score: false,
        overall_score: false,
        participation: false,
        total_score: 3,
        user_id: 1,
        username: 'student'
    }, {
        first_quiz: false,
        high_score: false,
        overall_score: false,
        participation: false,
        total_score: 2,
        user_id: 3,
        username: 'Sohil'
    }, {
        first_quiz: false,
        high_score: false,
        overall_score: false,
        participation: false,
        total_score: 0,
        user_id: 11,
        username: 'Apu'
    }, {
        first_quiz: false,
        high_score: false,
        overall_score: false,
        participation: false,
        total_score: 0,
        user_id: 4,
        username: 'Mina'
    }
];


const allPercentageScoresData = [
    { user_id: 23, average: 100 },
    { user_id: 24, average: 100 },
    { user_id: 21, average: 90 },
    { user_id: 22, average: 90 },
    { user_id: 19, average: 80 },
    { user_id: 20, average: 80 },
    { user_id: 10, average: 76.67 },
    { user_id: 17, average: 70 },
    { user_id: 18, average: 70 },
    { user_id: 8, average: 67.5 },
    { user_id: 15, average: 60 },
    { user_id: 16, average: 60 },
    { user_id: 13, average: 50 },
    { user_id: 14, average: 50 },
    { user_id: 11, average: 40 },
    { user_id: 12, average: 40 },
    { user_id: 6, average: 36.67 },
    { user_id: 9, average: 30 },
    { user_id: 7, average: 20 },
    { user_id: 5, average: 10 }
];


const studentHistoryData = [
    { name: 'Trivia quiz', num_questions: '10', quiz_id: 3, score: 2 },
    { name: 'Arbitrary 1', num_questions: '2', quiz_id: 4, score: 2 },
    { name: 'Arbitrary 2', num_questions: '2', quiz_id: 5, score: 1 },
    { name: 'Arbitrary 3', num_questions: '1', quiz_id: 6, score: 1 }
];

const updateQuizOptionsPayload = {
    module_id: 'TEST',
    quiz_id: 1,
    name: 'Week 1 Quiz',
    editedQuestions:
    [
        {
            question_id: 2,
            question: 'What is the capital of Croatia?',
            a: 'Zagreb',
            b: 'Cardiff',
            c: 'Edinburgh',
            d: 'Doncaster',
            correct_answer: 'a',
            quiz_id: '1'
        },
        {
            question_id: 1,
            question: 'What is the capital of England?',
            a: 'London',
            b: 'Cardiff',
            c: 'Edinburgh',
            d: 'Doncaster',
            correct_answer: 'a',
            quiz_id: '1'
        }
    ],
    newQuestions: [],
    deletedQuestions: [],
    is_last_quiz: false
};

const moduleInfo = {
    medals: {
        condition: [39, 69],
        medal_name: ['bronze', 'silver', 'gold']
    },
    module_id: 'TEST',
    name: 'test module',
    num_enrolled: 5,
    owner: 2,
    quizzes: [
        {
            is_last_quiz: false,
            is_presented: true,
            name: 'Week 1 Quiz',
            num_entries: '4',
            num_questions: '2',
            quiz_id: 1,
            share_id: 'testingsharecodeforquiz'
        },
        {
            is_last_quiz: false,
            is_presented: true,
            name: 'Week 2 Quiz',
            num_entries: '3',
            num_questions: '3',
            quiz_id: 2,
            share_id: null
        }
    ],
    surveys: [
        {
            is_presented: true,
            name: 'Week 1 Survey',
            num_entries: '4',
            num_questions: '2',
            survey_id: 1,
            share_id: 'testingsharecodeforsurvey'
        },
        {
            is_presented: true,
            name: 'Week 2 Survey',
            num_entries: '4',
            num_questions: '2',
            survey_id: 2,
            share_id: null
        }
    ],
    trophies: {
        condition: [1, 100, 2, 2],
        trophy_name: ['first_quiz', 'high_score', 'overall_score', 'participation']
    }
};

const superAdminDashboardData = {
    students: [{
        user_id: 1,
        email: 'student@city.ac.uk',
        is_lecturer: false,
        is_super_admin: false,
        username: 'student',
        is_verified: true,
        expiry_code: null,
        verification_code: null,
        reset_password_code: null
    }],
    lecturer: [{
        user_id: 2,
        email: 'lecturer@city.ac.uk',
        is_lecturer: true,
        is_super_admin: true,
        username: 'student',
        is_verified: true,
        expiry_code: null,
        verification_code: null,
        reset_password_code: null
    }],
    clients: []
};

const groupAdminDashboardData = {
    lecturer: [{
        user_id: 2,
        email: 'lecturer@city.ac.uk',
        is_lecturer: true,
        is_super_admin: true,
        username: 'student',
        is_verified: true,
        expiry_code: null,
        verification_code: null,
        reset_password_code: null
    }],
    userAccountLimitInformation: { user_limit: 1000, count: 500 }
};


module.exports = {
    users,
    usersById,
    userDetails,
    feedback,
    dashboardData,
    medals,
    trophies,
    newModule,
    quizzes,
    module: _module,
    expectedLecturer,
    expectedStudent,
    newQuiz,
    getQuizDetailsData,
    questions,
    reviewQuestions,
    liveQuizQuestions,
    nextQuestion,
    getModuleMembers,
    getQuizMembers,
    getQuizIDListData,
    getScoresForLeaderboardData,
    getTotalScoresAndTrophiesData,
    allPercentageScoresData,
    studentHistoryData,
    updateQuizOptionsPayload,
    questionsAnswers,
    moduleInfo,
    superAdminDashboardData,
    groupAdminDashboardData
};
