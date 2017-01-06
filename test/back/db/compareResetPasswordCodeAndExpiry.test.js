const test = require('tape');
const calculateQuizScore = require('../../../server/lib/calculateQuizScore.js');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);
const compareResetPasswordCodeAndExpiry = require('../../../server/lib/compareResetPasswordCodeAndExpiry.js');

test('`compareResetPasswordCodeAndExpiry` returns true when the expiry code and reset token exist', (t) => {

    t.plan(1);

    initDb()
  .then(() => {
      let reset_password_code = 'reset-password-code';
      let expected = true;

      compareResetPasswordCodeAndExpiry(pool, reset_password_code, (error, response) => {

          if (error) {
              t.error(error);
          }
          t.deepEqual(response, expected);
      });
  });
});

test('`compareResetPasswordCodeAndExpiry` returns error message that the reset code has not been found', (t) => {

    t.plan(1);

    initDb()
  .then(() => {
      let reset_password_code = 'reset-password-code-fake';
      let expected = { message: "Sorry, your reset request has not been found" };

      compareResetPasswordCodeAndExpiry(pool, reset_password_code, (error, response) => {

          if (error) {
              t.error(error);
          }
          t.deepEqual(response, expected);
      });
  });
});

test('`compareResetPasswordCodeAndExpiry` returns an error message that the expiry code has expired', (t) => {

    t.plan(1);

    initDb()
  .then(() => {
      let reset_password_code = 'reset-password-code-2';
      let expected = { message: "Sorry, your reset password link has expired, please submit another reset request" };

      compareResetPasswordCodeAndExpiry(pool, reset_password_code, (error, response) => {

          if (error) {
              console.error(error);
          }
          t.deepEqual(response, expected);
      });
  });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});

