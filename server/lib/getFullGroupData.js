var query = require('./query');

/**
 * Returns a datadump of full set of group data.
 * Returns an object of arrays. Keys: 'name', 'questions'.
 * @param {object} client - database client
 * @param {function} callback - callback function
 */

function getFullGroupData (client, groupCode, callback) {
    var fullGroupDataQuery = `
      SELECT SUM(scores.score) as score, COUNT(quizzes.quiz_id) as quizzes_taken, scores.user_id, u_student.email, u_student.username, modules.module_id
      FROM scores inner join quizzes on quizzes.quiz_id = scores.quiz_id
      INNER JOIN modules on quizzes.module_id = modules.module_id
      INNER JOIN users u_lecturer ON u_lecturer.user_id = modules.user_id
      INNER JOIN users u_student ON u_student.user_id = scores.user_id
      WHERE u_lecturer.group_code = $1 AND u_student.is_lecturer = false
      GROUP BY scores.user_id, u_student.email, u_student.username, modules.module_id;`;
    var fullGroupDataParams = [groupCode];

    query(client, fullGroupDataQuery, fullGroupDataParams, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }
        var result = [];
        var modules = [];
        var rows = response.rows.reduce((a, b) => {
            if (!a[b.user_id]) {
                a[b.user_id] = { user_email: b.email, user_nickname: b.username };
            }
            a[b.user_id][b.module_id + "_score"] = b.score;
            a[b.user_id][b.module_id + "_quizzes_taken"] = b.quizzes_taken;

            if (modules.indexOf(b.module_id) === -1) {
                modules.push(b.module_id);
            }

            return a;
        }, {});

        for (var key in rows) {
            modules.forEach(m => {
                if (!rows[key][m + "_score"] || !rows[key][m + "_quizzes_taken"]) {
                    rows[key][m + "_score"] = "-";
                    rows[key][m + "_quizzes_taken"] = "-";
                }
            });

            result.push(rows[key]);
        }

        callback(null, result);
    });
}

module.exports = getFullGroupData;
