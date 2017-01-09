import test from 'tape';
import validCookieExists from '../../src/js/lib/validCookieExists.js';
import { socketClient } from '../../src/js/socket.js';

test('validCookieExists works', (t) => {

    t.plan(1);
    t.equal(validCookieExists(), true, 'A valid cookie is detected');
});

test('FINAL TEARDOWN', (t) => {

    socketClient.disconnect();
    t.end();
});
