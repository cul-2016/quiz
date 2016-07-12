var query = require('./pg-pool');

function saveModule (module_id, user_id, name, medals, trophies, callback) {

    var moduleQuery = [
        'INSERT INTO modules (module_id, user_id, name) VALUES ( $1, $2, $3);',
        'INSERT INTO medals (module_id, medal_name, condition) VALUES ($1, $2, $3), ($1, $4, $5), ($1, $6, $7);',
        'INSERT INTO trophies (module_id, trophy_name, condition) VALUES ($1, $2, $3), ($1, $4, $5), ($1, $6, $7), ($1, $8, $9);'
    ];
    var moduleArray = [
        [module_id, user_id, name],
        [module_id, medals.medal_name[0], medals.condition[0], medals.medal_name[1], medals.condition[1], medals.medal_name[2], medals.condition[2]],
        [module_id, trophies.trophy_name[0], trophies.condition[0], trophies.trophy_name[1], trophies.condition[1], trophies.trophy_name[2], trophies.condition[2], trophies.trophy_name[3], trophies.condition[3]]
    ];


    var index = 0;
    function report (error, result) {
        index++;
        if (error) {
            return callback(error);
        }
        if (moduleArray.length === index) {
            return callback(null, result);
        } else {
            query(moduleQuery[index], moduleArray[index], report);
        }
    }

    query(moduleQuery[index], moduleArray[index], report);

}
module.exports = saveModule;
