const query = require('./query.js');

const getQuestionsForUser = (user_id, rows) => {
    return rows
        .filter((row) => !row.user_id || row.user_id === user_id)
        .reduce((prev, curr) => {
            const questionIdInPrev = prev.map(
                (question) => question.question_id
            ).includes(curr.question_id);

            const prevQuestionIdResponse = (prev.filter(
                (question) => question.question_id === curr.question_id
            )[0] || {}).response;

            if (questionIdInPrev) {
                if (!prevQuestionIdResponse) {
                    const indexOfPrevQuestId = prev
                        .map((question) => question.question_id)
                        .indexOf(curr.question_id);

                    return prev.map(
                        (question, i) =>
                            i === indexOfPrevQuestId
                            ? curr
                            : question
                    );
                } else {
                    return prev;
                }
            } else {
                return prev.concat(curr);
            }
        }, [])
        .map((question) => ({
            question: question.question,
            a: question.a,
            b: question.b,
            c: question.c,
            d: question.d,
            correct_answer: question.correct_answer,
            response: question.response,
            more_information: question.more_information,
        }));

};

/**
 * Returns from the database quiz info
 * (questions, options, correct answer and provided answer).
 *
 * Returns an array of questions
 * @param {object} client - database client
 * @param {string} quiz_id - unique quiz id
 * @param {string} user_id - unique user id
 * @param {function} callback - callback function
 */

const getQuizDetailsStudent = (client, quiz_id, user_id, callback) => {

    const questionsQuery = [
        'SELECT',
        'q.question, q.a, q.b, q.c, q.d, q.correct_answer, q.question_id, q.more_information, r.response, r.user_id, q.order_id',
        'FROM',
        'questions as q',
        'LEFT OUTER JOIN',
        'responses as r',
        'on q.question_id = r.question_id',
        'WHERE q.quiz_id = $1',
        'ORDER BY q.order_id'
    ].join(' ');

    query(client, questionsQuery, [quiz_id], (error, questions) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }

        callback( null, getQuestionsForUser(user_id, questions.rows));
    });
};

module.exports = { getQuizDetailsStudent, getQuestionsForUser };
