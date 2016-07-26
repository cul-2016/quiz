/**
 * Function to organise module into the expected structure.
 * Returns an object with the expected structure.
 * @param {string} module_id - the module id
 * @param {object} data - object containing rows of data from postgres
 * @param {function} callback - callback function
 */

function organiseModuleData (module_id, data, callback) {
    console.log(data);
    const organisedData = {
        module_id: module_id,
        name: undefined,
        numEnrolled: data.numEnrolled[0].count,
        medals: {
            medal_name: [
                data.medals[0].medal_name,
                data.medals[1].medal_name,
                data.medals[2].medal_name
            ],
            condition: [
                data.medals[0].condition,
                data.medals[1].condition,
                data.medals[2].condition
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
                data.trophies[0].condition,
                data.trophies[1].condition,
                data.trophies[2].condition,
                data.trophies[3].condition,
            ]
        },
        quizzes: data.quizzes
    };

    callback(null, organisedData);
}

module.exports = organiseModuleData;
