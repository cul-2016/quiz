import test from 'tape';
import deepFreeze from '../utils/deepFreeze';


test('deepFreeze makes an object immutable', (t) => {

    t.plan(1);

    let before = {
        name: 'Harry Potter',
        house: 'Gryffindor'
    };

    let frozen = deepFreeze(before);

    try {
        frozen.wandCore = 'Phoenix feather';
    } catch (error) {

        const expected = new TypeError("Can't add property wandCore, object is not extensible");
        t.deepEqual(error, expected, 'Frozen object remains unchanged');
    }
});
