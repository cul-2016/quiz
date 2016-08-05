/**
 * Function to organise module into the expected structure.
 * Returns an object with the expected structure.
 * @param {string} module_id - the module id
 * @param {object} data - object containing rows of data from postgres
 * @param {function} callback - callback function
 */

function organiseModuleData (module_id, data, callback) {

    const organisedData = {
        module: {
            module_id: module_id,
            name: data.general[0].name,
            num_enrolled: parseInt(data.general[0].num_enrolled, 10),
            medals: {
                medal_name: [
                    data.medals[0].medal_name,
                    data.medals[1].medal_name,
                    data.medals[2].medal_name
                ],
                condition: [
                    parseInt(data.medals[0].condition, 10),
                    parseInt(data.medals[1].condition, 10)
                ]
            },
            trophies: {
                trophy_name: [
                    data.trophies[0].trophy_name,
                    data.trophies[1].trophy_name,
                    data.trophies[2].trophy_name,
                    data.trophies[3].trophy_name
                ],
                condition: [
                    parseInt(data.trophies[0].condition, 10),
                    parseInt(data.trophies[1].condition, 10),
                    parseInt(data.trophies[2].condition, 10),
                    parseInt(data.trophies[3].condition, 10),
                ]
            }
        },
        quizzes: data.quizzes
    };

    callback(null, organisedData);
}

module.exports = organiseModuleData;
