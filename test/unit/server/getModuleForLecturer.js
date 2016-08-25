import test from 'tape';
import getModuleForLecturer from '../../../server/lib/getModuleForLecturer';
import { testClient } from '../../utils/init';

test('Gets the module for a given student', (t) => {

    t.plan(1);
    const expectedRows = {
        module: {
            medals: {
                condition: [39, 69],
                medal_name: ['bronze', 'silver', 'gold']
            },
            module_id: 'TEST',
            name: 'test module',
            num_enrolled: 3,
            trophies: {
                condition: [1, 100, 70, 3],
                trophy_name: ['first_quiz', 'high_score', 'overall_average', 'participation']
            },
        },
        quizzes: [
            {
                is_presented: false,
                name: 'Week 1 Quiz',
                num_entries: '3',
                num_questions: '2',
                quiz_id: 1
            },
            {
                is_presented: false,
                name: 'Week 2 Quiz',
                num_entries: '3',
                num_questions: '2',
                quiz_id: 2
            },
            {
                is_presented: false,
                name: 'Test Quiz',
                num_entries: null,
                num_questions: '1',
                quiz_id: 3
            }
        ]
    };

    getModuleForLecturer(testClient, 'TEST', (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct row module details');
    });
});
