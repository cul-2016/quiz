const test = require('tape');
const getTotalScoresAndTrophies = require('../../../server/lib/getTotalScoresAndTrophies');
const expected = require('../../utils/data-fixtures').getTotalScoresAndTrophiesData;
const { testClient } = require('../../utils/init');

test('`getTotalScoresAndTrophies` works', (t) => {
    t.plan(1);
    const module_id = 'TEST';
    getTotalScoresAndTrophies(testClient, module_id, (error, mainData) => {

        t.deepEqual(mainData, expected, 'Returns total_scores and trophies. If no quiz data for a particular student, returns total_score as zero');
    });
});
