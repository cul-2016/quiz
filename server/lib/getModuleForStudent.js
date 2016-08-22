var query = require('./query');
var queries = require('./queries.json');

/**
 * Fetches module information for a student.
 * Returns an object. Keys: 'module_id', 'name', 'medals', 'trophies_awarded'.
 * @param {object} client - database client
 * @param {string} module_id - unique module id
 * @param {number} user_id - user id
 * @param {function} callback - callback function
 */

function getModuleForStudent (client, module_id, user_id, callback) {

    query(client, queries.getModuleForStudent.main, [module_id], (error, main) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        console.log(main.rows);
        query(client, queries.getModuleForStudent.medals, [module_id], (error, medals) => {

            if (error) {
                console.error(error);
                return callback(error);
            }
            console.log(medals.rows);
        });
    });
}

/*
SELECT modules.name, module_members.first_quiz, module_members.full_marks, module_members.overall_average, module_members.participation
FROM modules
JOIN module_members ON modules.module_id = module_members.module_id
WHERE modules.module_id = 'TEST';

 */

module.exports = getModuleForStudent;
