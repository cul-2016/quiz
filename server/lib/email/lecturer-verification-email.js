var sendEmail   = require('sendemail'); // no api key

module.exports = ({ name, email, verificationLink }, cb) => {
    var person = {
        email,
        subject: "Welcome to Quodl",
        verificationLink,
        url: process.env.SERVER_ROUTE
    };
    sendEmail.email('lecturer-verification', person, cb);
};
