require('env2')('config.env');

require('./db/runner.js');
require('./endpoints/runner.js');
require('../utils/utilsTest/runner.js');
