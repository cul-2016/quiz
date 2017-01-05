const test = require('tape');
const getQuizIDList = require('../../../server/lib/getQuizIDList');
const { testClient } = require('../../utils/init');
const expected = require('../../utils/data-fixtures').getQuizIDListData;

test('`getQuizIDList` works', (t) => {

    t.plan(1);

    const module_id = 'TEST';

    getQuizIDList(testClient, module_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected, 'database returns a list of quiz ids');
    });
});
