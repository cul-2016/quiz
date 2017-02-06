const tape = require('tape');

const getQuestionsForUser = require('../../../server/lib/getQuizDetailsStudent.js').getQuestionsForUser;

const quizIdArray = [
    {
        question: '1111111',
        a: 'aaaaa',
        b: 'bbbbbbbb',
        c: 'ccccccccccccccc',
        d: 'ddddddddddddddddddd',
        correct_answer: 'a',
        question_id: 53,
        response: undefined,
        user_id: 1
    },
    {
        question: '1111111',
        a: 'aaaaa',
        b: 'bbbbbbbb',
        c: 'ccccccccccccccc',
        d: 'ddddddddddddddddddd',
        correct_answer: 'a',
        question_id: 53,
        response: 'a',
        user_id: 2
    },
    {
        question: '1111111',
        a: 'aaaaa',
        b: 'bbbbbbbb',
        c: 'ccccccccccccccc',
        d: 'ddddddddddddddddddd',
        correct_answer: 'a',
        question_id: 53,
        response: undefined,
        user_id: 3
    },
    {
        question: '1111111',
        a: 'aaaaa',
        b: 'bbbbbbbb',
        c: 'ccccccccccccccc',
        d: 'ddddddddddddddddddd',
        correct_answer: 'a',
        question_id: 53,
        response: 'a',
        user_id: 1
    },
    {
        question: '22222222222222',
        a: 'aa',
        b: 'bb',
        c: 'cc',
        d: 'dd',
        correct_answer: 'b',
        question_id: 54,
        response: undefined,
        user_id: 1
    },
    {
        question: '22222222222222',
        a: 'aa',
        b: 'bb',
        c: 'cc',
        d: 'dd',
        correct_answer: 'b',
        question_id: 54,
        response: undefined,
        user_id: 2
    }
];

const userQuestions = [
    {
        question: '1111111',
        a: 'aaaaa',
        b: 'bbbbbbbb',
        c: 'ccccccccccccccc',
        d: 'ddddddddddddddddddd',
        correct_answer: 'a',
        response: 'a',
    },
    {
        question: '22222222222222',
        a: 'aa',
        b: 'bb',
        c: 'cc',
        d: 'dd',
        correct_answer: 'b',
        response: undefined,
    }
];

tape('getQuestionsForUser returns the correct questions for a specific user', (t) => {
    t.plan(1);

    const actual = getQuestionsForUser(1, quizIdArray);
    const expected = userQuestions;

    t.deepEqual(actual, expected);
});
