import test from 'tape';
import getNewTrophies from '../../../src/js/lib/getNewTrophies';

test('getNewTrophies returns null when oldTrophyState and newTrophyState are equal', (t) => {

    t.plan(1);
    var expected = null;
    const oldTrophyState = {
        first_quiz: true,
        high_score: true,
        overall_average: true,
        participation: true
    };
    const newTrophyState = {
        first_quiz: true,
        high_score: true,
        overall_average: true,
        participation: true
    };
    var actual = getNewTrophies(oldTrophyState, newTrophyState);

    t.deepEqual(expected, actual);
});

test('getNewTrophies returns array of trophies that have been awarded to the student, where all previous trophies are set to false', (t) => {

    t.plan(1);
    var expected = [
        'first_quiz',
        'high_score'
    ];
    const oldTrophyState = {
        first_quiz: false,
        high_score: false,
        overall_average: false,
        participation: false
    };
    const newTrophyState = {
        first_quiz: true,
        high_score: true,
        overall_average: false,
        participation: false
    };
    var actual = getNewTrophies(oldTrophyState, newTrophyState);

    t.deepEqual(expected, actual);
});

test('getNewTrophies returns array of trophies that have been awarded to the student, where oldTrophyState contains some trophies already', (t) => {

    t.plan(1);
    var expected = [
        'overall_average',
    ];
    const oldTrophyState = {
        first_quiz: true,
        high_score: true,
        overall_average: false,
        participation: true
    };
    const newTrophyState = {
        first_quiz: true,
        high_score: true,
        overall_average: true,
        participation: true
    };
    var actual = getNewTrophies(oldTrophyState, newTrophyState);

    t.deepEqual(expected, actual);
});
