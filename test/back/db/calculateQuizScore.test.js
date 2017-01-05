const test = require('tape');
const calculateQuizScore = require('../../../server/lib/calculateQuizScore.js');
const pool = require('../../../server/lib/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test("`calculateQuizScore` gets a student's score for a quiz", (t) => {

    t.plan(1);

    initDb()
  .then(() => {

      const user_id = 1;
      const quiz_id = 2;
      const expected = {
          raw: 1,
          percentage: 33
      };

      calculateQuizScore(pool, user_id, quiz_id, (error, response) => {

          if (error) {
              console.error(error);
          }
          t.deepEqual(response, expected, 'returns the correct score');
      });
  });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
