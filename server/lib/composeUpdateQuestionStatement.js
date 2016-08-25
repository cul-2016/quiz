/**
 * Represents a function that creates the prepared object required to update questions
 * @param {array} rows - array of objects that need to be saved to the database
 * @param {function} callback - a callback function
 */


function composeUpdateQuestionStatement (rows, callback) {

    var params = [];
    var chunks = [];
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var valueClause = [];
        params.push(row.question_id);
        valueClause.push('$' + params.length);
        params.push(row.quiz_id);
        valueClause.push('$' + params.length);
        params.push(row.question);
        valueClause.push('$' + params.length);
        params.push(row.a);
        valueClause.push('$' + params.length);
        params.push(row.b);
        valueClause.push('$' + params.length);
        params.push(row.c);
        valueClause.push('$' + params.length);
        params.push(row.d);
        valueClause.push('$' + params.length);
        params.push(row.correct_answer);
        valueClause.push('$' + params.length);
        chunks.push('(' + valueClause.join(', ') + ')');
    }

    // INSERT INTO questions (question_id, quiz_id, question, a, b, c, d, correct_answer) VALUES (1, 1, 'What is the capital of Japan?', 'London', 'Cardiff', 'Tokyo', 'Doncaster', 'C') ON CONFLICT (question_id) DO UPDATE SET question = EXCLUDED.question, a = EXCLUDED.a, b = EXCLUDED.b, c = EXCLUDED.c, d = EXCLUDED.d, correct_answer = EXCLUDED.correct_answer;



    callback(null, {
        text: 'INSERT INTO questions (question_id, quiz_id, question, a, b, c, d, correct_answer) VALUES ' + chunks.join(', ') + 'ON CONFLICT (question_id) DO UPDATE SET question = EXCLUDED.question, a = EXCLUDED.a, b = EXCLUDED.b, c = EXCLUDED.c, d = EXCLUDED.d, correct_answer = EXCLUDED.correct_answer;',
        values: params
    });

}

module.exports = composeUpdateQuestionStatement;
