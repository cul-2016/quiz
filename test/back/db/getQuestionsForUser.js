const tape = require('tape');

const getQuestionsForUser = require('../../../server/lib/getQuizDetailsStudent.js').getQuestionsForUser;

const question1WithoutId = {
    question: '1111111',
    a: 'aaaaa',
    b: 'bbbbbbbb',
    c: 'ccccccccccccccc',
    d: 'ddddddddddddddddddd',
    correct_answer: 'a'
};

const question2WithoutId = {
    question: '22222222222222',
    a: 'aa',
    b: 'bb',
    c: 'cc',
    d: 'dd',
    correct_answer: 'b',
};

const question1 = Object.assign({ question_id: 53 }, question1WithoutId);
const question2 = Object.assign({ question_id: 54 }, question2WithoutId);

const responseAndUserIdsQuestion1WithId = (withId) => {
    return [
        { response: undefined, user_id: 1 },
        { response: 'a', user_id: 2 },
        { response: undefined, user_id: 3 }
    ].concat(
        withId
        ? { response: 'a', user_id: 1 }
        : { response: 'a' }
    ).map(
        (respAndUserId) => Object.assign(
            {}, question1, respAndUserId
        )
    );
};

const responseAndUserIdsQuestion2WithId = (withId) => {
    return [
        { response: undefined, user_id: 1 }
    ].concat(
        withId
        ? { response: undefined, user_id: 2 }
        : { response: undefined }
    ).map(
        (respAndUserId) => Object.assign(
            {}, question2, respAndUserId
        )
    );
};

const quizIdArrayWithIds = (withId) => {
    return [
        ...responseAndUserIdsQuestion1WithId(withId),
        ...responseAndUserIdsQuestion2WithId(withId)
    ];
};

const quizIdArray1 = quizIdArrayWithIds(true);
const quizIdArray2 = quizIdArrayWithIds(false);

const userQuestions = [
    Object.assign({ response: 'a' }, question1WithoutId),
    Object.assign({ response: undefined }, question2WithoutId)
];

[
    quizIdArray1,
    quizIdArray2
].forEach((array) => {
    tape('getQuestionsForUser returns the correct questions for a specific user', (t) => {
        t.plan(1);

        const actual = getQuestionsForUser(1, array);
        const expected = userQuestions;

        t.deepEqual(actual, expected);
    });
});
