
/**
* Returns approprate text for the 'ranking' section in student feedback component
* @param {object} text - json of various text strings
* @param {number} number representing the student's ranking, or null
*/
export function displayRankingText (text, ranking) {

    if (ranking === null) {
        return text.ranking.null;
    }
    if (ranking <= 10) {
        return text.ranking.top10;
    }
    if (ranking >= 11 && ranking <= 25) {
        return text.ranking.top11to25;
    }
    if (ranking >= 26 && ranking <= 50) {
        return text.ranking.top26to50;
    }
    if (ranking >= 51 && ranking <= 90) {
        return text.ranking.top51to90;
    }
    if (ranking >= 91) {
        return text.ranking.top91to100;
    }
}

/**
* Returns approprate text for the 'strengths and weaknesses' section in student feedback component
* @param {object} text - json of various text strings
* @param {array} quizzes - array of quiz names, or null
*/
export function displayStrengthsWeaknessesText (text, quizzes) {

    if (!quizzes) {

        return text.strengthsWeaknesses.null;
    } else {

        return `Looking across all the quizzes you’ve taken, your top quiz was ${quizzes[1].name}. The quiz where you could improve most, relative to other people, is ${quizzes[0].name}. You can use this information to help guide your revision, and work out which areas you might want to spend more time getting to grips with.`;
    }
}

/**
* Returns approprate text for the 'participation' section in student feedback component
* @param {object} text - json of various text strings
* @param {number} submissionRate - the student's submission rate, or null
*/
export function displayParticipationText (text, submissionRate) {

    if (!submissionRate) {
        return text.participation.null;
    }
    if (submissionRate < 50) {
        return text.participation["<50"];
    }
    if (submissionRate >= 50 && submissionRate <= 74) {
        return text.participation["50to74"];
    }
    if (submissionRate >= 75) {
        return text.participation[">=75"];
    } else {
        return "{no specific message specified}";
    }
}
