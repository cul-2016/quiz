import test from 'tape';
import isCookieMessageRequired from '../../../src/js/lib/isCookieMessageRequired';

test('checking if isCookieMessageRequired returns true', (t) => {

    t.plan(1);
    var expected = true;
    var actual = isCookieMessageRequired();

    t.deepEqual(expected, actual);
});


test('checking if isCookieMessageRequired returns false if set to false', (t) => {

    document.cookie = "cul_is_cookie_accepted=false";
    t.plan(1);
    var expected = false;
    var actual = isCookieMessageRequired();

    t.deepEqual(expected, actual);
});

test('checking if isCookieMessageRequired returns true if set to undefined', (t) => {

    document.cookie = "cul_is_cookie_accepted=";
    t.plan(1);
    var expected = true;
    var actual = isCookieMessageRequired();

    t.deepEqual(expected, actual);
});
