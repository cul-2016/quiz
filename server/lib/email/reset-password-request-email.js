var sendEmail   = require('sendemail'); // no api key

module.exports = ({ name, email, resetPasswordLink }, cb) => {
    var person = {
        name,
        email,
        subject: "Reset password request for Quodl",
        resetPasswordLink
    };
    sendEmail.email('reset-password', person, cb);
};
