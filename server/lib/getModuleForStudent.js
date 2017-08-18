var query = require('./query');
var queries = require('./queries.json');
var organiseModuleData = require('./organiseModuleData');
/**
 * Returns module information for a student.
 * Returns an object. Keys: 'module_id', 'name', 'medals', 'trophies_awarded'.
 * @param {object} client - database client
 * @param {string} module_id - unique module id
 * @param {number} user_id - user id
 * @param {function} callback - callback function
 */

function getModuleForStudent (client, user_id, module_id, callback) {

    query(client, queries.getModuleForStudent.main, [user_id, module_id], (error, main) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }
        const mainData = main.rows;

        query(client, queries.getModuleForStudent.medals, [module_id], (error, medals) => {
            /* istanbul ignore if */
            if (error) {
                console.error(error);
                return callback(error);
            }
            const medalsData = medals.rows;
            const allData = mainData.concat(medalsData);

            organiseModuleData(false, module_id, allData, (error, data) => {
                /* istanbul ignore if */
                if (error) {
                    throw error;
                }
                callback(null, data);
            });
        });
    });
}

module.exports = getModuleForStudent;
