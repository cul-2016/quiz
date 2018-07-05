var query = require('./query');

/**
 * Represents a function that updates the password for a given user and deletes the expiry_code and reset_password_code
 * @param {object} client - postgres database client
 * @param {function} callback - a callback function
 */

function mergeUsers (pool, email, userId, moodleId, callback) {
  var updateUserQuery = 'UPDATE users SET merge_required = false WHERE email = $1 RETURNING user_id;';
  var updateUserValues = [email];

  pool.connect((error, client, done) => {
    /* istanbul ignore if */
    if (error) {
        return callback(error);
    }

    client.query(updateUserQuery, updateUserValues, (error, res) => {
      /* istanbul ignore if */
      if (error) return handleError(error, callback);
      return callback(null, true);
    })
  });
}

function handleError(error, cb) {
  console.log(error);
  return callback(error);
}

module.exports = mergeUsers;
