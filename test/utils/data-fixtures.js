export const users = [
    {
        user_id: 1,
        email: 'student@city.ac.uk',
        password: '$2a$10$UnvUuW91Jh6.zWQi3G/2J.HLDTomSqJHxvBC.TYx/Bj8HZa.AAm4K',
        is_lecturer: false,
        username: 'student'
    }
];

export const userDetails = {
    user_id: 1,
    email: 'test@test.com',
    username: 'test',
    is_lecturer: true
};

export const dashboardData = [
    {
        module_id: 'CS50',
        name: 'Intro to Computer Science'
    }
];

export const medals = {
    medal_name: [
        "bronze",
        "silver",
        "gold"
    ],
    condition: [39, 69]
};

export const trophies = {
    trophy_name: [
        "participation",
        "overall_average",
        "high_score",
        "first_quiz"
    ],
    condition: [3, 60, 100, 1]
};

export const newModule = Object.assign({}, dashboardData[0], { medals }, { trophies });


export const quizzes = [
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

export const module = Object.assign({}, newModule, { quizzes });

export const getModuleData = {
    module_id: 'TEST',
    name: 'test module',
    medals: {
        medal_name: ["bronze", "silver", "gold"],
        condition: [39, 69]
    },
    trophies: {
        trophy_name: [
            "first_quiz",
            "high_score",
            "overall_average",
            "participation"
        ],
        condition: [3, 60, 100, 1]
    },
    numEnrolled: 1,
    quizzes: [
        {
            quiz_id: 2,
            name: 'Week 1 Quiz',
            numQuestions: 22,
            numEntries: 1,
            isPresented: false
        },
        {
            quiz_id: 5,
            name: 'Week 2 Quiz',
            numQuestions: 2,
            numEntries: 1,
            isPresented: false
        }
    ]
};
