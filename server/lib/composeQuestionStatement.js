/**
 * Represents a function that creates the prepared object required to save questions
 * @param {array} rows - array of objects that need to be saved to the database
 * @param {function} callback - a callback function
 */

function composeQuestionStatement (rows, callback) {

    var params = [];
    var chunks = [];
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var valueClause = [];
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

    callback(null, {
        text: 'INSERT INTO questions (quiz_id, question, a, b, c, d, correct_answer) VALUES ' + chunks.join(', '),
        values: params
    });

}

module.exports = composeQuestionStatement;
