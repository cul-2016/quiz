import test from 'tape';
import mapStringToNumber from '../../../server/utils/mapStringToNumber';


test('`mapStringToNumber` works', (t) => {

    t.plan(1);

    const testArray = [
        { user_id: 1, average: '15.56' },
        { user_id: 3, average: '89.00' },
        { user_id: 5, average: '56.01' }
    ];

    const expected = [
        { user_id: 1, average: 15.56 },
        { user_id: 3, average: 89.00 },
        { user_id: 5, average: 56.01 }
    ];

    mapStringToNumber(testArray, (error, result) => {

        t.deepEqual(result, expected);
    });
});
