var Index = require('./routes/index');
var GetModuleList = require('./routes/get-module-list');
var GetModule = require('./routes/get-module');
var ValidateModule = require('./routes/validate-module');
var AddNewModule = require('./routes/add-new-module');
var SaveUser = require('./routes/save-user');
var ValidateUser = require('./routes/authenticate-user');
var GetUserDetails = require('./routes/get-user-details');
var SaveQuiz = require('./routes/save-quiz');
var GetQuizQuestions = require('./routes/get-quiz-questions');
var JoinModule = require('./routes/join-module');
var SaveStudentResponse = require('./routes/save-student-response');

var routes = [
    Index,
    GetModuleList,
    GetModule,
    ValidateModule,
    AddNewModule,
    SaveUser,
    ValidateUser,
    GetUserDetails,
    SaveQuiz,
    GetQuizQuestions,
    JoinModule,
    SaveStudentResponse
];

module.exports = routes;
