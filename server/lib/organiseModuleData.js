/**
 * Function to organise module into the expected structure.
 * Returns an object with the expected structure for either a student or a lecturer.
 * @param {Boolean} is_lecturer - Boolean indicating if the user is a lecturer or not
 * @param {string} module_id - the module id
 * @param {object} data - object containing rows of data from postgres
 * @param {function} callback - callback function
 */

function organiseModuleData (is_lecturer, module_id, data, callback) {

    if (arguments.length !== 4) {
        callback(new Error("Wrong number of arguments for organiseModuleData - should be 4"));
    }

    let organisedData;

    if (is_lecturer) {

        organisedData = {
            module_id: module_id,
            name: data.info[0].name,
            owner: data.info[0].user_id,
            num_enrolled: parseInt(data.num_enrolled[0].num_enrolled, 10),
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
            },
            quizzes: data.quizzes,
            surveys: data.surveys
        };
    } else {

        organisedData = {
            module_id: module_id,
            name: data.trophies_awarded.name,
            medals: {
                medal_name: ['bronze', 'silver', 'gold'],
                condition: [data.medals[0].condition, data.medals[1].condition]
            },
            uses_trophies: data.trophies_awarded.uses_trophies,
            trophies_awarded: {
                first_quiz: data.trophies_awarded.first_quiz,
                high_score: data.trophies_awarded.high_score,
                participation: data.trophies_awarded.participation,
                overall_score: data.trophies_awarded.overall_score
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
            },
        };
    }

    callback(null, organisedData);
}

module.exports = organiseModuleData;
