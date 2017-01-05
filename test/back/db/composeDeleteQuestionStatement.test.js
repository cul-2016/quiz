const test = require('tape');
const composeDeleteQuestionStatement = require('../../../server/lib/composeDeleteQuestionStatement');
const pool = require('../../../server/lib/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('composeDeleteQuestionStatement returns the correctly formatted object', (t) => {
    t.plan(1);

    initDb()
    .then(() => {
    
      const deletedQuestions = [1, 2];
      const expected = { text: 'DELETE FROM questions WHERE question_id IN ($1, $2);', values: [1, 2] };

      composeDeleteQuestionStatement(deletedQuestions, (error, response) => {
          t.deepEqual(response, expected);
      });

    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});

