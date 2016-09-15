import test from 'tape';
import mapQuizIDToName from '../../../server/lib/mapQuizIDToName';
import { testClient } from '../../utils/init';


test('`mapQuizIDToName` returns name for each quiz id in an array', (t) => {

    t.plan(1);

    const array = [
        { quiz_id: 2, difference: 1 },
        { quiz_id: 3, difference: 8 },
    ];
    const expected = [
        { quiz_id: 2, name: "Week 2 Quiz" },
        { quiz_id: 3, name: "Trivia quiz" }
    ];

    mapQuizIDToName(testClient, array, (error, result) => {

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

    mapQuizIDToName(testClient, tooLong, (error, result) => {

        t.ok(error instanceof Error, 'An error is returned');
        t.notOk(result);
    });

    const tooShort = [
        { quiz_id: 2, difference: 1 },
        { quiz_id: 3, difference: 8 },
        { quiz_id: 5, difference: 2 },
        { quiz_id: 1, difference: -9 },
    ];

    mapQuizIDToName(testClient, tooShort, (error, result) => {

        t.ok(error instanceof Error, 'An error is returned');
        t.notOk(result);
    });
});
