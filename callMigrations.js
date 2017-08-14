var migrations = require('./migrations');

if (!process.env.CIRCLE_CI || !process.env.TESTING) {
    migrations(process.exit);
}
