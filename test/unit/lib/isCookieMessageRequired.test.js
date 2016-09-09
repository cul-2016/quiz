import test from 'tape';
import isCookieMessageRequired from '../../../src/js/lib/isCookieMessageRequired';

test('isCookieMessageRequired returns true when cookie is set to true', (t) => {

    t.plan(1);
    var expected = true;
    var actual = isCookieMessageRequired();

    t.deepEqual(expected, actual);
});


test('isCookieMessageRequired returns false when cookie is set to false', (t) => {

    document.cookie = "cul_is_cookie_accepted=false";
    t.plan(1);
    var expected = false;
    var actual = isCookieMessageRequired();

    t.deepEqual(expected, actual);
});

test('isCookieMessageRequired returns true when cookie is set to undefined', (t) => {

    document.cookie = "cul_is_cookie_accepted=";
    t.plan(1);
    var expected = true;
    var actual = isCookieMessageRequired();

    t.deepEqual(expected, actual);
});
