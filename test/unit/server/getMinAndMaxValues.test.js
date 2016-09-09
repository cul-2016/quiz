import test from 'tape';
import getMinAndMaxValues from '../../../server/lib/getMinAndMaxValues';


test('`getMinAndMaxValues` returns the min and max values in an array of signed differences', (t) => {

    const array = [
        { quiz_id: 3, difference: 1 },
        { quiz_id: 3, difference: 8 },
        { quiz_id: 3, difference: 10 },
        { quiz_id: 3, difference: 5 },
        { quiz_id: 3, difference: -6 },
        { quiz_id: 3, difference: 3 }
    ];
    const expected = [
        { quiz_id: 3, difference: -6 },
        { quiz_id: 3, difference: 10 }
    ];
    const notExpected = [
        { quiz_id: 3, difference: 10 },
        { quiz_id: 3, difference: -6 }
    ];

    // TODO: ADD MORE SIMPSON QUIZZES.  NEED SOMEONE TO HAVE COMPLETED 3
    // need some others to have completed them too, for a mean to exist

    getMinAndMaxValues(array, (error, result) => {

        t.plan(2);
        t.deepEqual(result, expected);
        t.notDeepEqual(result, notExpected);
    });
});
