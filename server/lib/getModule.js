var query = require('./query'); // eslint-disable-line no-unused-vars

/**
 *
 */

function getModule (client, module_id, callback) {

    //list of queries
    // 'SELECT name FROM modules WHERE module_id = $1;';
    // 'SELECT * FROM quizzes WHERE module_id = $1;'
    // 'SELECT COUNT(*) FROM questions where quiz_id = $1;'; // multiple times for each quiz.
    // 'SELECT count(*) FROM module_members where module_id = $1;';
    //
    // select modules.name, quizzes.title, quizzes.quiz_id, count(question)
    //     from
    //         questions
    //         inner join quizzes
    //             on quizzes.quiz_id = questions.quiz_id
    //         inner join modules
    //             on quizzes.module_id = modules.module_id
    //     where
    //         quizzes.module_id = 'TEST'
    //     group by quizzes.quiz_id;

    callback();
}

module.exports = getModule;
