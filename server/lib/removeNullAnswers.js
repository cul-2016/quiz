function removeNullAnswers (questions) {

    for (let i = 0; i < questions.length; i++) {

        for (let answer in questions[i]) {

            if (questions[i][answer] === null) {
                delete questions[i][answer];
            }
        }
        if (i === questions.length - 1) {

            return (questions);
        }
    }
}

module.exports = removeNullAnswers;
