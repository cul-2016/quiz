var sendEmail   = require('sendemail'); // no api key

module.exports = ({ name, email }, cb) => {
    var person = {
        name,
        email,
        subject: "Welcome to City Uni :)"
    };
    sendEmail('student-welcome', person, cb);
};
