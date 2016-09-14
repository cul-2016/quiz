
/**
* Returns approprate text for the 'ranking' section in student feedback component
* @param {object} text - json of various text strings
* @param {number} number representing the student's ranking, or null
*/
export function displayRankingText (text, ranking) {

    if (ranking === null) {

        return text.null;
    }
    if (ranking <= 10) {

        return text.top10;
    }
    if (ranking >= 11 && ranking <= 25) {

        return text.top11to25;
    }
    if (ranking >= 26 && ranking <= 50) {

        return text.top26to50;
    }
    if (ranking >= 51 && ranking <= 90) {

        return text.top51to90;
    }
    if (ranking >= 91) {

        return text.top91to100;
    }
}

/**
* Returns approprate text for the 'strengths and weaknesses' section in student feedback component
* @param {array} quizzes - array of quiz names, or null
*/
export function displayStrengthsWeaknessesText (quizzes) {

    if (!quizzes) {

        return "As you take more quizzes we will identify those that you are doing particularly well on relative to other people, and those that you are doing less well on.";
    } else {

        return `Looking across all the quizzes you’ve taken, your top quiz was ${quizzes[1].name}. The quiz where you could improve most, relative to other people, is ${quizzes[0].name}. You can use this information to help guide your revision, and work out which areas you might want to spend more time getting to grips with.`;
    }
}
