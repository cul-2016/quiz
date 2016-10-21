/**
 * Represents a function that removes null values from answers array
 * @param {object} client - postgres database client
 * @param {string} module_id - module_id
 * @param {number} user_id - user_id
 * @param {function} callback - a callback function
 */

function removeNullAnswers (questions) {

    var answerKeys = ['a', 'b', 'c', 'd'];
    for (let i = 0; i < questions.length; i++) {

        for (let answer in questions[i]) {

            if (answerKeys.indexOf(answer) !== -1) {
                if (questions[i][answer] === null) {
                    delete questions[i][answer];
                }
            }
        }
        if (i === questions.length - 1) {

            return (questions);
        }
    }
}

module.exports = removeNullAnswers;
