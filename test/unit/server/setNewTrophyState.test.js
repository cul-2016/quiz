import test from 'tape';
import setNewTrophyState from '../../../server/lib/setNewTrophyState';
import query from '../../../server/lib/query';
import { testClient } from '../../utils/init';

test("`setNewTrophyState` sets a student's new trophy state when overall_average is present", (t) => {

    t.plan(1);

    const user_id = 3;
    const module_id = 'TEST';
    const newTrophyState =  {
        first_quiz: true,
        high_score: false,
        overall_average: true,
        participation: true
    };

    const expected = {
        first_quiz: true,
        high_score: false,
        overall_average: true,
        participation: true
    };

    setNewTrophyState(testClient, user_id, module_id, newTrophyState, (error) => {

        if (error) {
            console.error(error);
        }
        var testQuery = "SELECT first_quiz, high_score, overall_average, participation FROM module_members WHERE user_id = $1 AND module_id = $2;";

        query(testClient, testQuery, [user_id, module_id], (error, result) => {
            if (error) {
                console.error(error);
            }
            t.deepEqual(result.rows[0], expected, 'sets the new trophy state');
        });
    });
});

test("`setNewTrophyState` sets a student's new trophy state when overall_average is not present", (t) => {

    t.plan(1);

    const user_id = 3;
    const module_id = 'TEST';
    const newTrophyState =  {
        first_quiz: true,
        high_score: false,
        participation: true
    };

    const expected = {
        first_quiz: true,
        high_score: false,
        participation: true
    };

    setNewTrophyState(testClient, user_id, module_id, newTrophyState, (error) => {

        if (error) {
            console.error(error);
        }
        var testQuery = "SELECT first_quiz, high_score, participation FROM module_members WHERE user_id = $1 AND module_id = $2;";

        query(testClient, testQuery, [user_id, module_id], (error, result) => {
            if (error) {
                console.error(error);
            }
            t.deepEqual(result.rows[0], expected, 'sets the new trophy state');
        });
    });
});

test("`setNewTrophyState` returns an error if newTrophyState does not have the correct number of properties (i.e. 3 or 4)", (t) => {

    t.plan(1);

    const user_id = 3;
    const module_id = 'TEST';
    const newTrophyState = {
        first_quiz: true,
    };

    setNewTrophyState(testClient, user_id, module_id, newTrophyState, (error) => {

        if (error) {
            console.error(error);
        }
        t.ok(error, 'Function correctly returns an error');
    });
});
