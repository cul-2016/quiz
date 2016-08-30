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

export const newQuiz = {
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

export const getQuizDetailsData = {
    name: 'Old Quiz',
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

export const questions = [
    {
        question: 'capital of England',
        a: 'London',
        b: 'Tokyo',
        c: 'New York',
        d: 'Paris',
        correct_answer: 'a'
    }
];

export const reviewQuestions = [
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

export const liveQuizQuestions = [
    {
        question_id: 1,
        question: 'capital of England',
        a: 'London',
        b: 'Tokyo',
        c: 'New York',
        d: 'Paris'
    }
];

export const nextQuestion = {
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

export const getModuleForLecturerData = {
    module: {
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
            condition: [1, 100, 65, 2]
        },
        num_enrolled: 3
    },
    quizzes: [
        {
            quiz_id: 1,
            name: 'Week 1 Quiz',
            num_questions: '2',
            num_entries: '3',
            is_presented: true
        },
        {
            quiz_id: 2,
            name: 'Week 2 Quiz',
            num_questions: '3',
            num_entries: '2',
            is_presented: true
        }
    ]
};

export const getModuleForStudentData = {

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

export const getModuleMembers = [{
    email: 'student@city.ac.uk',
    user_id: 1,
    username: 'student'
}];

export const getQuizMembers = [{
    user_id: 1,
    quiz_id: 1,
    score: 5
}];
