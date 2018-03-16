var sendEmail   = require('sendemail'); // no api key

module.exports = ({ name, email, verificationLink }, cb) => {
    var person = {
        email,
        subject: "Welcome to Quodl",
        verificationLink
    };
    sendEmail.email('lecturer-verification', person, cb);
};
