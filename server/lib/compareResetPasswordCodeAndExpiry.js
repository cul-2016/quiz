 var query = require('./query');

 /**
  * Represents a function that checks if the reset password token and expiry exist.
  * @param {object} client - postgres database client
  * @param {string} reset_password_code - reset password code
  * @param {function} callback - a callback function
  */

 function compareResetPasswordCodeAndExpiry (client, reset_password_code, callback) {

     var queryText = 'SELECT expiry_code from users where reset_password_code = $1;';
     var value = [reset_password_code];

     query(client, queryText, value, (error, response) => {

         if (error) {
             console.error(error);
             return callback(error);
         }
         if (response.rows.length === 0) {
             return callback(null, { message: "Sorry, your reset request has not been found" });
         }
         var expiry_code = response.rows[0].expiry_code;
         if (expiry_code > Date.now()) {
             return callback(null, true);
         }
         else {
             return callback(null, { message: "Sorry, your reset password link has expired, please submit another reset request" });
         }
     });
 }

 module.exports = compareResetPasswordCodeAndExpiry;
