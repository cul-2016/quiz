/**
 * Represents a function that composes a statement to save (n) number of questions to the database
 * @param {array} rows - array of objects that need to be saved to the database
 * @param {function} callback - a callback function
 */

function composeQuestionStatement (id, rows, { isSurvey }, callback) {

    var params = [];
    var chunks = [];
    const quizIdOrSurveyId = isSurvey ? 'survey_id' : 'quiz_id';

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (isSurvey) {
            row.survey_id = id;
        } else {
            row.quiz_id = id;
        }
        var valueClause = [];
        params.push(row[quizIdOrSurveyId]);
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
        // nullify correct_answer for surveys
        params.push(isSurvey ? null : row.correct_answer);
        valueClause.push('$' + params.length);
        chunks.push('(' + valueClause.join(', ') + ')');
    }

    callback(null, {
        text: `INSERT INTO questions (${quizIdOrSurveyId}, question, a, b, c, d, correct_answer) VALUES ` + chunks.join(', '),
        values: params
    });

}

module.exports = composeQuestionStatement;
