import test from 'tape';
import { testClient } from '../../utils/init';
import getPercentileRank from '../../../server/lib/getPercentileRank';


test.skip("`getPercentileRank` returns a student's percentile rank for a module", (t) => {

    const user_id = 5;
    const module_id = 'CENT';

    getPercentileRank(testClient, user_id, module_id, (error, result) => { //eslint-disable-line no-unused-vars
        //WIP
        t.end();
    });
});
