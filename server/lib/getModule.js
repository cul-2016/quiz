var query = require('./query'); // eslint-disable-line no-unused-vars
var queries = require('./queries.json');

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
            callback(error);
        }
        query(client, queries.getModule.medals, [module_id], (error, medals) => {

            if (error) {
                callback(error);
            }
            query(client, queries.getModule.trophies, [module_id], (error, trophies) => {

                if (error) {
                    callback(error);
                }
                query(client, queries.getModule.numUsers, [module_id], (error, numUsers) => {

                    callback(
                        null, {
                            quizzes: quizzes.rows,
                            medals: medals.rows,
                            trophies: trophies.rows,
                            numUsers: numUsers.rows
                        }
                    );
                });
            });
        });
    });
}

module.exports = getModule;
