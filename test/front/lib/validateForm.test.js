import test from 'tape';
import validateForm from '../../../src/js/lib/validateForm';



test('`validateForm` returns false when all information is present and valid', (t) => {

    t.plan(1);
    const name = "test quiz",
        module_id = "TEST",
        moduleIDExists = false,
        medals = [20, 60],
        trophies = {
            condition: [
                1,
                50,
                1,
                4
            ]
        };

    const result = validateForm(name, module_id, moduleIDExists, medals, trophies);
    t.equal(result, false);
});

test('`validateForm` returns true when moduleIDExists is true', (t) => {

    t.plan(1);
    const name = "test quiz",
        module_id = "TEST",
        moduleIDExists = true,
        medals = [20, 60],
        trophies = {
            condition: [
                1,
                50,
                1,
                4
            ]
        };

    const result = validateForm(name, module_id, moduleIDExists, medals, trophies);
    t.equal(result, true);
});
