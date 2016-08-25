import test from 'tape';
import { getFirstQuizState,
         getHighScoreState } from '../../../server/lib/trophy-methods'; //eslint-disable-line
import { testClient } from '../../utils/init';


test('`getFirstQuizState` awards an eligible student with `first quiz` trophy', (t) => {

    const user_id = 1;
    const quiz_id = 1;

    getFirstQuizState(testClient, user_id, quiz_id, (error, result) => {

        t.plan(2);

        t.equal(typeof result, 'boolean', "getFirstQuizState returns a Boolean value");
        t.equal(result, true, 'Trophy awarded');
    });
});

test('`getFirstQuizState` does not award an ineligible student with `first quiz` trophy', (t) => {

    const user_id = 16;
    const quiz_id = 1;

    getFirstQuizState(testClient, user_id, quiz_id, (error, result) => {

        t.plan(2);

        t.equal(typeof result, 'boolean', "getFirstQuizState returns a Boolean value");
        t.equal(result, false, 'Trophy not awarded');
    });
});

test('`getHighScoreState` awards an eligible student with `high_score` trophy', (t) => {

    const module_id = 'TEST';
    const percentageScore = 100;

    getHighScoreState(testClient, module_id, percentageScore, (error, result) => {

        t.plan(2);

        t.equal(typeof result, 'boolean', "getHighScoreState returns a Boolean value");
        t.equal(result, true, 'Trophy awarded');
    });
});

test('`getHighScoreState` does not award an ineligible student with `high_score` trophy', (t) => {

    const module_id = 'TEST';
    const percentageScore = 70;

    getHighScoreState(testClient, module_id, percentageScore, (error, result) => {

        t.plan(2);

        t.equal(typeof result, 'boolean', "getHighScoreState returns a Boolean value");
        t.equal(result, false, 'Trophy not awarded');
    });
});
