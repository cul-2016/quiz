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
        params.push(row.A);
        valueClause.push('$' + params.length);
        params.push(row.B);
        valueClause.push('$' + params.length);
        params.push(row.C);
        valueClause.push('$' + params.length);
        params.push(row.D);
        valueClause.push('$' + params.length);
        params.push(row.correct_answer);
        valueClause.push('$' + params.length);
        chunks.push('(' + valueClause.join(', ') + ')');
    }

    callback(null, {
        text: 'INSERT INTO questions (quiz_id, question, A, B, C, D, correct_answer) VALUES ' + chunks.join(', '),
        values: params
    });

}

module.exports = composeQuestionStatement;
