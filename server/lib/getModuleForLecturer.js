require('babel-register')({
    presets: ['es2015']
});
var query = require('./query');
var queries = require('./queries.json');
var organiseModuleData = require('./organiseModuleData');

/**
 * Fetches module information for a lecturer.
 * Returns an object of arrays. Keys: 'quizzes', 'medals', 'trophies'.
 * @param {object} client - database client
 * @param {string} module_id - unique module id
 * @param {function} callback - callback function
 */

function getModuleForLecturer (client, module_id, callback) {

    query(client, queries.getModuleForLecturer.quizzes, [module_id], (error, quizzes) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        query(client, queries.getModuleForLecturer.medals, [module_id], (error, medals) => {

            if (error) {
                console.error(error);
                return callback(error);
            }
            query(client, queries.getModuleForLecturer.trophies, [module_id], (error, trophies) => {

                if (error) {
                    console.error(error);
                    return callback(error);
                }
                query(client, queries.getModuleForLecturer.num_enrolled, [module_id], (error, num_enrolled) => {

                    if (error) {
                        console.error(error);
                        return callback(error);
                    }

                    query(client, queries.getModuleForLecturer.name, [module_id], (error, name) => {

                        if (error) {
                            console.error(error);
                            return callback(error);
                        }
                        const allData = {
                            quizzes: quizzes.rows,
                            medals: medals.rows,
                            trophies: trophies.rows,
                            num_enrolled: num_enrolled.rows,
                            name: name.rows
                        };

                        organiseModuleData(true, module_id, allData, (error, organisedData) => {

                            callback(null, organisedData);
                        });
                    });
                });
            });
        });
    });
}

module.exports = getModuleForLecturer;
