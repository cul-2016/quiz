
export function displayRankingText (text, ranking) {

    if (ranking === null) {

        return text.noQuizzes;
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
