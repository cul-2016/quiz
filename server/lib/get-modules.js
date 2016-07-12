var query = require('./pg-pool');

function getModules (user_id, callback) {

    var moduleQuery = 'SELECT module_id, name FROM modules WHERE user_id = $1;';
    var moduleValue = [user_id];

    query(moduleQuery, moduleValue, (error, response) => {
        if (error) {
            callback(error);
        }
        callback(null, response);
    });
}

module.exports = getModules;
