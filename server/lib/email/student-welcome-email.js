var sendEmail   = require('sendemail'); // no api key

module.exports = ({ username, email }, cb) => {
    var person = {
        username,
        email,
        subject: "Welcome to Quodl",
        url: process.env.SERVER_ROUTE
    };
    sendEmail.email('student-welcome', person, cb);
};
