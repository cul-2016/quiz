var sendEmail   = require('sendemail'); // no api key

module.exports = ({ name, email, code }, cb) => {
    var person = {
        email,
        subject: "Time to setup your Quodl account!",
        code,
        url: process.env.SERVER_ROUTE,
        registerURL: `${process.env.SERVER_ROUTE}/#/register-lecturer`
    };
    sendEmail.email('group-admin-welcome', person, cb);
};
