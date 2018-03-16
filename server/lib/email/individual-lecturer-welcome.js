var sendEmail   = require('sendemail'); // no api key

module.exports = ({ name, email, code }, cb) => {
    var person = {
        email,
        subject: "Time to setup your Quodl account!",
        code
    };
    sendEmail.email('individual-lecturer-welcome', person, cb);
};
