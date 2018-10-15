// Stub the cron job, so tests don't hang forever
const sinon = require('sinon');
const cron = require('cron')
var stub = sinon.stub(cron, "CronJob").returns({start: function(){}});

require('env2')('config.env');

require('./db/runner.js');
require('./endpoints/runner.js');
require('../utils/utilsTest/runner.js');
