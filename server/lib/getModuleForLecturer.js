require('babel-register')({
    presets: ['es2015']
});
var query = require('./query');
var queries = require('./queries.json');
var organiseModuleData = require('./organiseModuleData');

/**
 * Returns module information for a lecturer.
 * Returns an object of arrays. Keys: 'quizzes', 'medals', 'trophies'.
 * @param {object} client - database client
 * @param {string} module_id - unique module id
 * @param {function} callback - callback function
 */

function getModuleForLecturer (client, module_id, callback) {

    query(client, queries.getModuleForLecturer.quizzes, [module_id], (error, quizzes) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        } else {
            // this slow down allows the resource to clear from lock (used resource being responses?)
            // TODO find better alternative to setTimeout for deadlock issue
            setTimeout(() => {
                query(client, queries.getModuleForLecturer.surveys, [module_id], (error, surveys) => {
                    /* istanbul ignore if */
                    if (error) {
                        console.error(error);
                        return callback(error);
                    } else {
                        query(client, queries.getModuleForLecturer.medals, [module_id], (error, medals) => {
                            /* istanbul ignore if */
                            if (error) {
                                console.error(error);
                                return callback(error);
                            }
                            query(client, queries.getModuleForLecturer.trophies, [module_id], (error, trophies) => {
                                /* istanbul ignore if */
                                if (error) {
                                    console.error(error);
                                    return callback(error);
                                }
                                query(client, queries.getModuleForLecturer.num_enrolled, [module_id], (error, num_enrolled) => {
                                    /* istanbul ignore if */
                                    if (error) {
                                        console.error(error);
                                        return callback(error);
                                    }
                                    query(client, queries.getModuleForLecturer.info, [module_id], (error, info) => {
                                        /* istanbul ignore if */
                                        if (error) {
                                            console.error(error);
                                            return callback(error);
                                        }
                                        const allData = {
                                            quizzes: quizzes.rows,
                                            surveys: surveys.rows,
                                            medals: medals.rows,
                                            trophies: trophies.rows,
                                            num_enrolled: num_enrolled.rows,
                                            info: info.rows
                                        };

                                        organiseModuleData(true, module_id, allData, (error, organisedData) => {

                                            callback(null, organisedData);
                                        });
                                    });
                                });
                            });
                        });
                    }
                });
            }, 200);
        }
    });
}

module.exports = getModuleForLecturer;
