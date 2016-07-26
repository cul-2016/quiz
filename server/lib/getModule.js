var query = require('./query'); // eslint-disable-line no-unused-vars
var queries = require('./queries.json');
var organiseModuleData = require('./organiseModuleData');

/**
 * Fetches module information from the database.
 * Returns an object of arrays. Keys: 'quizzes', 'medals', 'trophies'.
 * @param {object} client - database client
 * @param {string} module_id - unique module id
 * @param {function} callback - callback function
 */

function getModule (client, module_id, callback) {

    query(client, queries.getModule.quizzes, [module_id], (error, quizzes) => {

        if (error) {
            console.error(error);
            callback(error);
        }
        query(client, queries.getModule.medals, [module_id], (error, medals) => {

            if (error) {
                console.error(error);
                callback(error);
            }
            query(client, queries.getModule.trophies, [module_id], (error, trophies) => {

                if (error) {
                    console.error(error);
                    callback(error);
                }
                query(client, queries.getModule.numEnrolled, [module_id], (error, numEnrolled) => {

                    if (error) {
                        console.error(error);
                        callback(error);
                    }
                    const allData = {
                        quizzes: quizzes.rows,
                        medals: medals.rows,
                        trophies: trophies.rows,
                        numEnrolled: numEnrolled.rows
                    };

                    organiseModuleData(module_id, allData, (error, organisedData) => {

                        callback(null, organisedData);
                    });
                });
            });
        });
    });
}

module.exports = getModule;
