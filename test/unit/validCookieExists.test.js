import test from 'tape';
import validCookieExists from '../../src/js/lib/validCookieExists';

test('validCookieExists works', (t) => {

    t.plan(1);
    t.equal(validCookieExists(), true, 'A valid cookie is detected');
});
