/**
 * Represents a function that composes a statement to delete (n) number of questions from the database
 * @param {array} rows - array of question objects that need to be deleted from the database
 * @param {function} callback - a callback function
 */

function composeDeleteQuestionStatement (rows, callback) {

    var params = [];
    var chunks = [];
    for (var i = 0; i < rows.length; i++) {
        var question_id = rows[i];
        var valueClause = [];
        params.push(question_id);
        valueClause.push('$' + params.length);
        chunks.push(valueClause.join(', '));
    }

    callback(null, {
        text: 'DELETE FROM questions WHERE question_id IN (' + chunks.join(', ') + ');',
        values: params
    });

}

module.exports = composeDeleteQuestionStatement;
