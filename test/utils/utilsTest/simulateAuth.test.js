const tape = require('tape');
const server = require('../initServer.js');
const simulateAuth = require('../simulateAuth.js')(server);
const redisCli = server.app.redisCli;
const pool = require('../../../server/lib/dbClient.js');
const initDb = require('../initDb.js')(pool, redisCli);


tape('simulateAuth returns a token', (t) => {
    t.plan(1);
    initDb()
    .then(() => simulateAuth())
    .then((token) => {
        console.log(token);
        t.ok(token);
    });
});

tape.onFinish(() => {
    redisCli.quit();
    pool.end();
});
