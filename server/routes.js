var Index = require('./routes/index');
var GetModuleList = require('./routes/get-module-list');
var GetModule = require('./routes/get-module');
var ValidateModule = require('./routes/validate-module');
var AddNewModule = require('./routes/add-new-module');
var SaveUser = require('./routes/save-user');
var ValidateUser = require('./routes/authenticate-user');
var GetUserDetails = require('./routes/get-user-details');
var SaveQuiz = require('./routes/save-quiz');
var routes = [
    Index,
    GetModuleList,
    GetModule,
    ValidateModule,
    AddNewModule,
    SaveUser,
    ValidateUser,
    GetUserDetails,
    SaveQuiz
];

module.exports = routes;
