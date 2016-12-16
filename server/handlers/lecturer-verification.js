var email   = require('sendemail'); // no api key
// email.set_template_directory('../templates/lecturer-verification.html');

var person = {
    name: "franzmoro88",
    email: "franzmoro88@gmail.com",
    subject: "Welcome to City Uni :)",
    link: 'http://cul-app.herokuapp.com/'
};

email('lecturer-verification', person, function (error, result){
    console.log(' - - - - - - - - - - - - - - - - - - - - -> email sent: ');
    console.log(result);
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
});
