var query = require('./query');

/**
 * Returns a Boolean value isVerified
 * This function also changes the is_verified column to true if the verification_code matches
 * @param {object} client - database client
 * @param {string} verification_code - code retreived from the users URL query param
 * @param {function} callback - callback function
 */

function verifyCode (client, verification_code, callback) {

    var userQuery = 'SELECT * FROM users WHERE verification_code = $1';
    query(client, userQuery, [verification_code], (error, user) => {
        if (error) {
            console.error(error);
            return callback(error);
        }

        if (!user || user.rows[0].is_verified){
            return callback(null, false);
        }
        else {
            const removeVerificationCodeQuery = 'UPDATE users SET (is_verified, verification_code) = ($1, $2) WHERE user_id = $3';
            const removeVerificationCodeArray = [true, null, user.rows[0].user_id];

            query(client, removeVerificationCodeQuery, removeVerificationCodeArray, (error) => {
                if (error) {
                    console.error(error);
                    return callback(error);
                }
                return callback(error, true);
            });

        }
    });
}

module.exports = verifyCode;
