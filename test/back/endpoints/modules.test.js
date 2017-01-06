const test = require('tape');
const server = require('../../../server/server.js');
const simulateAuth = require('../../utils/simulateAuth.js')(server);
const pool = require('../../utils/dbClient.js');
const redisCli = server.app.redisCli;
const initDb = require('../../utils/initDb.js')(pool, redisCli);

const { newModule } = require('../../utils/data-fixtures');
const expectedStudent = require('../../utils/data-fixtures').getModuleForStudentData;
const expectedLecturer = require('../../utils/data-fixtures').getModuleForLecturerData;

[
    { url: '/add-new-module?user_id=1', method: 'post', payload: newModule },
    { url: '/get-module-members?module_id=TEST' },
    { url: '/get-module?module_id=TEST&is_lecturer=true' },
    { url: '/get-module-list?user_id=2&is_lecturer=true' },
    { url: '/get-module-list?user_id=1&is_lecturer=false' },
    { url: '/remove-module-member?module_id=TEST&user_id=2' },
    { url: '/validate-module?module_id=TEST' },
    { url: '/join-module?module_id=FAC8&user_id=7' }
].forEach((endpoint) => {
    test(endpoint.url + ' endpoint returns 401 due to fake token', (t) => {
        t.plan(1);

        initDb()
        .then(() => simulateAuth())
        .then((token) => {
            const faketoken = token.substring(token.length - 5);
        
            const options = {
                method: endpoint.method || 'get',
                url: endpoint.url,
                payload: endpoint.payload,
                headers: { Authorization: faketoken }
            };

            return server.inject(options);
        })
        .then((response) => {
            t.equal(response.statusCode, 200, '401 status code for ' + endpoint.url);
        });
    });

    test(endpoint.url + ' endpoint works', (t) => {
        t.plan(1);

        initDb()
        .then(() => simulateAuth())
        .then((token) => {
        
            const options = {
                method: endpoint.method || 'get',
                url: endpoint.url,
                payload: endpoint.payload,
                headers: { Authorization: token }
            };

            return server.inject(options);
        })
        .then((response) => {
            t.equal(response.statusCode, 200, '200 status code');
        });
    });

    test(endpoint.url + ' endpoint returns 401 if no token is present', (t) => {

        t.plan(1);

        initDb()
        .then(() => {

            const options = {
                method: endpoint.method || 'get',
                url: endpoint.url,
                payload: endpoint.payload,
            };

            return server.inject(options)
        })
        .then((response) => {
            t.equal(response.statusCode, 401, '401 status code for ' + endpoint.url);
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
