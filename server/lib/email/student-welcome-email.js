var sendEmail   = require('sendemail'); // no api key

module.exports = ({ username, email }, cb) => {
    var person = {
        username,
        email,
        subject: "Welcome to City Uni :)"
    };
    sendEmail('student-welcome', person, cb);
};
