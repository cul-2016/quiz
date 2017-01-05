import test from 'tape';
import { testClient } from '../../utils/init';
import saveSurvey from '../../../server/lib/saveSurvey';


test('`saveSurvey` returns the survey id for the saved survey', (t) => {

    t.plan(1);

    const expected = 9;
    const module_id = 'TEST';
    const name = 'New test survey';

    saveSurvey(testClient, module_id, name, (error, survey_id) => {

        if (error) {
            console.error(error);
            t.error('should not have errored');
        } else {
            t.deepEqual(survey_id, expected);
        }
    });
});
