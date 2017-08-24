const query = require('./query.js');
const getQuizForImportQuery = require('./queries.json').getQuizforImport;
const getSurveyForImportQuery = require('./queries.json').getSurveyforImport;
const importQuizQuery = require('./queries.json').importQuiz;
const importSurveyQuery = require('./queries.json').importSurvey;
const importQuestionQuery = require('./queries.json').importQuestion;

function submitImportCode (client, import_code, module_id, callback) {
    const importParams = [import_code];
    // query for quiz
    query(client, getQuizForImportQuery, importParams, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            return callback(error);
        } else {
            let questions = response.rows;
            if (questions.length === 0) {
                return insertSurvey(client, importParams, module_id, callback);
            } else {
                return insertQuiz(client, questions, module_id, callback);
            }
        }
    });
}

function insertSurvey (client, import_params, module_id, callback) {
    query(client, getSurveyForImportQuery, import_params, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            return callback(error);
        } else {
            let surveyQuestions = response.rows;
            if (surveyQuestions.length === 0) {
                return callback(null, false);
            } else {
                const survey_name = surveyQuestions[0].name;
                const importSurveyParams = [module_id, survey_name];
                // query to insert survey
                query(client, importSurveyQuery, importSurveyParams, (error, response) => {
                    const new_survey_id = response.rows[0].survey_id;
                    return insertMultipleQuestions(client, importQuestionQuery, surveyQuestions, null, new_survey_id, callback);
                });
            }
        }
    });
}

function insertQuiz (client, questions, module_id, callback) {
    const quiz_name = questions[0].name;
    const importQuizParams = [module_id, quiz_name];
    // query to insert quiz
    query(client, importQuizQuery, importQuizParams, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            return callback(error);
        } else {
            const new_quiz_id = response.rows[0].quiz_id;
            return insertMultipleQuestions(client, importQuestionQuery, questions, new_quiz_id, null, callback);
        }
    });
}

function insertMultipleQuestions (client, import_question_query, questions, quiz_id, survey_id, callback) {
    if (questions.length === 0) {
        return callback(null, true);
    } else {
        const question = questions[0];
        const params = [question.order_id, quiz_id, survey_id, question.question, question.a, question.b, question.c, question.d, question.correct_answer];
        return query(client, import_question_query, params, (error) => {
            if (error) {
                return callback(error);
            } else {
                const newQuestions = questions.slice(1);
                return insertMultipleQuestions(client, import_question_query, newQuestions, quiz_id, survey_id, callback);
            }
        });
    }
}



module.exports = submitImportCode;
