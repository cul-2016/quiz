var Index = require('./handlers/index');
var GetModuleList = require('./handlers/get-module-list');
var GetModule = require('./handlers/get-module');
var ValidateModule = require('./handlers/validate-module');
var AddNewModule = require('./handlers/add-new-module');
var SaveUser = require('./handlers/save-user');
var ValidateUser = require('./handlers/authenticate-user');
var GetUserDetails = require('./handlers/get-user-details');
var SaveQuiz = require('./handlers/save-quiz');
var GetQuizQuestions = require('./handlers/get-quiz-questions');
var JoinModule = require('./handlers/join-module');
var SaveStudentResponse = require('./handlers/save-student-response');
var EndQuiz = require('./handlers/end-quiz');
var GetQuizResult = require('./handlers/get-quiz-result');
var GetQuizReview = require('./handlers/get-quiz-review');
var GetModuleMembers = require('./handlers/get-module-members');
var RemoveModuleMember = require('./handlers/remove-module-member');


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
    SaveStudentResponse,
    EndQuiz,
    GetQuizResult,
    GetQuizReview,
    GetModuleMembers,
    RemoveModuleMember
];

module.exports = routes;
