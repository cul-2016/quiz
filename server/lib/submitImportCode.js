const query = require('./query.js');
const getQuizforImportQuery = require('./queries.json').getQuizforImport;
const importQuizQuery = require('./queries.json').importQuiz;
const importQuestionQuery = require('./queries.json').importQuestion;

function submitImportCode (client, import_code, module_id, callback) {
    const getQuizforImportParams = [import_code];
    query(client, getQuizforImportQuery, getQuizforImportParams, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            return callback(error);
        } else {
            let questions = response.rows;
            if (questions.length === 0) {
                return callback();
            } else {
                const quiz_name = questions[0].name;
                const importQuizParams = [module_id, quiz_name, false, false, null];
                query(client, importQuizQuery, importQuizParams, (error, response) => {
                    /* istanbul ignore if */
                    if (error) {
                        return callback(error);
                    } else {
                        const new_quiz_id = response.rows[0].quiz_id;
                        return insertMultipleQuestions(client, importQuestionQuery, questions, new_quiz_id, callback);
                    }
                });
            }
        }
    });
}

function insertMultipleQuestions (client, importQuestionQuery, questions, quiz_id, callback) {
    if (questions.length === 0) {
        return callback(null, true);
    } else {
        const question = questions[0];
        const params = [question.order_id, quiz_id, question.question, question.a, question.b, question.c, question.d, question.correct_answer];
        return query(client, importQuestionQuery, params, (error) => {
            if (error) {
                return callback(error);
            } else {
                const newQuestions = questions.slice(1);
                return insertMultipleQuestions(client, importQuestionQuery, newQuestions, quiz_id, callback);
            }
        });
    }
}


module.exports = submitImportCode;
