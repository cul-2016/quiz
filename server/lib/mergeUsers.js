var query = require('./query');

/**
 * Represents a function that updates the password for a given user and deletes the expiry_code and reset_password_code
 * @param {object} client - postgres database client
 * @param {function} callback - a callback function
 */

function mergeUsers (pool, email, userId, moodleId, callback) {
  var deleteMoodle = 'UPDATE users SET moodle_id = NULL WHERE user_id = $1;';
  var deleteMoodleValues = [userId];

  var deleteQuery = 'DELETE from users WHERE user_id = $1;'
  var deleteValues = [userId];

  var updateUserQuery = 'UPDATE users SET moodle_id = $1 WHERE email = $2 RETURNING user_id;';
  var updateUserValues = [moodleId, email];

  var updateModuleQuery = 'UPDATE module_members SET user_id = $1 WHERE user_id = $2 AND module_id NOT IN (SELECT module_id from module_members WHERE user_id = $1);';

  pool.connect((error, client, done) => {
    /* istanbul ignore if */
    if (error) {
        return callback(error);
    }

    client.query('BEGIN', (err) => {
      if (error) return handleError(error, callback);
      client.query(deleteMoodle, deleteMoodleValues, (error, res) => {
        if (error) return handleError(error, callback);
        client.query(updateUserQuery, updateUserValues, (error, res) => {
          /* istanbul ignore if */
          if (error) return handleError(error, callback);
          client.query(updateModuleQuery, [res.rows[0].user_id, userId], (error, res) => {
            if (error) return handleError(error, callback);
            client.query(deleteQuery, deleteValues, (error, res) => {
              if (error) return handleError(error, callback);
              client.query('COMMIT', (err) => {
                if (error) return handleError(error, callback);
                return callback(null, true);
              })
            })
          });
        });
      });
    })
  });
}

function handleError(error, cb) {
  console.log(error);
  return callback(error);
}

module.exports = mergeUsers;
