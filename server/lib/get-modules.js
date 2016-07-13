var query = require('./query');

function getModules (pool, user_id, callback) {

    var moduleQuery = 'SELECT module_id, name FROM modules WHERE user_id = $1;';
    var moduleValue = [user_id];

    query(pool, moduleQuery, moduleValue, (error, response) => {
        if (error) {
            callback(error);
        }
        callback(null, response);
    });
}

module.exports = getModules;
