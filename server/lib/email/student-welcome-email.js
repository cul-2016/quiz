var sendEmail   = require('sendemail'); // no api key

module.exports = ({ username, email }, cb) => {
    var person = {
        username,
        email,
        subject: "Welcome to Quodl"
    };
    sendEmail.email('student-welcome', person, cb);
};
