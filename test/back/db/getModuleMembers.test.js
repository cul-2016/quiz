const test = require('tape');
const getModuleMembers = require('../../../server/lib/getModuleMembers');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getModuleMembers` gets list of students for a given module', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const expectedRows = [
            { email: 'student@city.ac.uk', user_id: 1, username: 'student' },
            { email: 'sohil@city.ac.uk', user_id: 3, username: 'Sohil' },
            { email: 'mina@city.ac.uk', user_id: 4, username: 'Mina' },
            { email: 'homer@simpsons.com', user_id: 5, username: 'Homer' },
            { email: 'apu@simpsons.com', user_id: 11, username: 'Apu' }
        ];
        getModuleMembers(pool, 'TEST', (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEquals(response, expectedRows, 'database returns correct row of users');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});


