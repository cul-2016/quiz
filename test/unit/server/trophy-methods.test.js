import test from 'tape';
import { getFirstQuizState,
         getHighScoreState,
         getOverallAverageState,
         getParticipationState } from '../../../server/lib/trophy-methods';
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

test('`getOverallAverageState` awards an eligible student with `overall_average` trophy', (t) => {

    const user_id = 1; // this student's overall average is 67%
    const module_id = 'TEST';

    getOverallAverageState(testClient, user_id, module_id, (error, result) => {

        t.plan(2);

        t.equal(typeof result, 'boolean', "getOverallAverageState returns a Boolean value");
        t.equal(result, true, 'Trophy awarded');
    });
});

test('`getOverallAverageState` does not award an ineligible student with `overall_average` trophy', (t) => {

    const user_id = 4; // this student's overall average is 0%
    const module_id = 'TEST';

    getOverallAverageState(testClient, user_id, module_id, (error, result) => {

        t.plan(2);

        t.equal(typeof result, 'boolean', "getOverallAverageState returns a Boolean value");
        t.equal(result, false, 'Trophy not awarded');
    });
});

test('`getParticipationState` awards an eligible student with `participation` trophy', (t) => {

    const user_id = 1;
    const module_id = 'TEST';

    getParticipationState(testClient, user_id, module_id, (error, result) => {

        t.plan(2);

        t.equal(typeof result, 'boolean', "getParticipationState returns a Boolean value");
        t.equal(result, true, 'Trophy awarded');
    });
});

test('`getParticipationState` does not award an ineligible student with `participation` trophy', (t) => {

    const user_id = 4;
    const module_id = 'TEST';

    getParticipationState(testClient, user_id, module_id, (error, result) => {

        t.plan(2);

        t.equal(typeof result, 'boolean', "getParticipationState returns a Boolean value");
        t.equal(result, false, 'Trophy not awarded');
    });
});
