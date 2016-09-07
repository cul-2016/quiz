import test from 'tape';
import { testClient } from '../../utils/init';
import getPercentile from '../../../server/lib/getPercentile';

// boundary percentile values --> [10, 25, 50, 90, 100]
// corresponding boundary scores  [95, 80, 55, 15, 10]

test("`getPercentile` correctly ranks students within 1 - 10% percentile", (t) => {

    t.plan(1);

    const module_id = 'CENT';
    const user_id = 24; //score: 100
    const expected = 10;

    getPercentile(testClient, user_id, module_id, (error, result) => {

        if (error) {
            console.error(error);
        }
        t.equal(result, expected, 'Value `10` is returned');
    });
});


test("`getPercentile` correctly ranks students within 11 - 25% percentile", (t) => {

    t.plan(2);

    const module_id = 'CENT';
    const user_id_1 = 22; //score: 90
    const user_id_2 = 19; //score: 80
    const expected = 25;

    getPercentile(testClient, user_id_1, module_id, (error, result) => {

        if (error) {
            console.error(error);
        }
        t.equal(result, expected, 'Value `25` is returned');
    });
    getPercentile(testClient, user_id_2, module_id, (error, result) => {

        if (error) {
            console.error(error);
        }
        t.equal(result, expected, 'Value `25` is returned');
    });
});


test("`getPercentile` correctly ranks students within 26 - 50% percentile", (t) => {

    t.plan(2);

    const module_id = 'CENT';
    const user_id_1 = 17;
    const user_id_2 = 15;
    const expected = 50;

    getPercentile(testClient, user_id_1, module_id, (error, result) => {

        if (error) {
            console.error(error);
        }
        t.equal(result, expected, 'Value `50` is returned');
    });
    getPercentile(testClient, user_id_2, module_id, (error, result) => {

        if (error) {
            console.error(error);
        }
        t.equal(result, expected, 'Value `50` is returned');
    });
});

test("`getPercentile` correctly ranks students within 51 - 90% percentile", (t) => {

    t.plan(4);

    const module_id = 'CENT';
    const user_id_1 = 13; //score: 50
    const user_id_2 = 11; //score: 40
    const user_id_3 = 9; //score: 30
    const user_id_4 = 7; //score: 20
    const expected = 90;

    getPercentile(testClient, user_id_1, module_id, (error, result) => {

        if (error) {
            console.error(error);
        }
        t.equal(result, expected, 'Value `90` is returned');
    });
    getPercentile(testClient, user_id_2, module_id, (error, result) => {

        if (error) {
            console.error(error);
        }
        t.equal(result, expected, 'Value `90` is returned');
    });
    getPercentile(testClient, user_id_3, module_id, (error, result) => {

        if (error) {
            console.error(error);
        }
        t.equal(result, expected, 'Value `90` is returned');
    });
    getPercentile(testClient, user_id_4, module_id, (error, result) => {

        if (error) {
            console.error(error);
        }
        t.equal(result, expected, 'Value `90` is returned');
    });
});

test("`getPercentile` correctly ranks students within 91 - 100% percentile", (t) => {

    t.plan(1);

    const module_id = 'CENT';
    const user_id = 6; //score: 10
    const expected = 100;

    getPercentile(testClient, user_id, module_id, (error, result) => {

        if (error) {
            console.error(error);
        }
        t.equal(result, expected, 'Value `100` is returned');
    });
});
