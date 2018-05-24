var query = require('../query');

/**
 * Represents a function that retrieves all lectures belonging to a group code
 * @param {object} client - postgres database client
 * @param {string} group_code - code which associates a lecturer to a particular group (e.g. a university department)
 * @param {function} callback - a callback function
 */

function getLecturersByGroupCode (client, group_code, callback) {
    var queryText = `
      SELECT COUNT(DISTINCT(modules.module_id)) as module_count, COUNT(DISTINCT(module_members.user_id)) as student_count,
      COUNT(DISTINCT(quizzes.quiz_id)) as quiz_count, COUNT(DISTINCT(responses)) as response_count,
      users.user_id, users.email, users.is_verified, users.is_user_active
      FROM modules
      FULL JOIN users ON users.user_id = modules.user_id
      FULL JOIN module_members ON module_members.module_id = modules.module_id
      FULL JOIN quizzes ON quizzes.module_id = modules.module_id AND quizzes.is_presented = true
      FULL JOIN responses ON responses.quiz_id = quizzes.quiz_id
      WHERE users.group_code = $1
      GROUP BY users.user_id`;

    var queryArray = [group_code];

    query(client, queryText, queryArray, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            console.error("`getLecturersByGroupCode`", error);
            return callback(error);
        }
        return callback(null, response.rows);
    });
}

module.exports = getLecturersByGroupCode;
