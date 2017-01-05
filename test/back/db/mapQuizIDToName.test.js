const test = require('tape');
const mapQuizIDToName = require('../../../server/lib/mapQuizIDToName');
const { pool } = require('../../utils/init');

test('`mapQuizIDToName` returns name for each quiz id in an array', (t) => {

    t.plan(1);

    const array = [
        { quiz_id: 1, difference: 8 },
        { quiz_id: 2, difference: 1 },

    ];
    const expected = [
        { quiz_id: 1, name: "Week 1 Quiz" },
        { quiz_id: 2, name: "Week 2 Quiz" }
    ];
    const module_id = 'TEST';

    mapQuizIDToName(pool, array, module_id, (error, result) => {

        t.deepEqual(result, expected);
    });
});

test('`mapQuizIDToName` returns an error for incorrect array length', (t) => {

    t.plan(4);

    const tooLong = [
        { quiz_id: 2, difference: 1 },
        { quiz_id: 3, difference: 8 },
        { quiz_id: 5, difference: 2 },
        { quiz_id: 1, difference: -9 },
    ];
    const module_id = 'TEST';

    mapQuizIDToName(pool, tooLong, module_id, (error, result) => {

        t.ok(error instanceof Error, 'An error is returned');
        t.notOk(result);
    });

    const tooShort = [
        { quiz_id: 1, difference: -9 }
    ];

    mapQuizIDToName(pool, tooShort, module_id, (error, result) => {

        t.ok(error instanceof Error, 'An error is returned');
        t.notOk(result);
    });
});
