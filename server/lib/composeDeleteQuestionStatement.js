/**
 * Represents a function that deleted the questions from the databases
 * @param {array} rows - array of objects that need to be saved to the database
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
