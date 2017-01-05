var Index = require('./handlers/index');
var GetModuleList = require('./handlers/get-module-list');
var GetModule = require('./handlers/get-module');
var ValidateModule = require('./handlers/validate-module');
var AddNewModule = require('./handlers/add-new-module');
var SaveUser = require('./handlers/save-user');
var VerifyLecturer = require('./handlers/verify-user.js');
var GetUserDetails = require('./handlers/get-user-details');
var ResetPasswordRequest = require('./handlers/reset-password-request.js');
var SaveQuiz = require('./handlers/save-quiz');
var GetQuizQuestions = require('./handlers/get-quiz-questions');
var JoinModule = require('./handlers/join-module');
var SaveStudentResponse = require('./handlers/save-student-response');
var EndQuiz = require('./handlers/end-quiz');
var GetQuizResult = require('./handlers/get-quiz-result');
var GetQuizReview = require('./handlers/get-quiz-review');
var GetModuleMembers = require('./handlers/get-module-members');
var RemoveModuleMember = require('./handlers/remove-module-member');
var GetQuizMembers = require('./handlers/get-quiz-members');
var EditScore = require('./handlers/edit-score');
var GetQuizDetails = require('./handlers/get-quiz-details');
var UpdateQuiz = require('./handlers/update-quiz');
var GetLeaderboard = require('./handlers/get-leaderboard');
var GetFeedback = require('./handlers/get-feedback');
var GetStudentHistory = require('./handlers/get-student-history');
var AbortQuiz = require('./handlers/abort-quiz');
var SubmitNewPassword = require('./handlers/submit-new-password');


var routes = [
    Index,
    GetModuleList,
    GetModule,
    ValidateModule,
    AddNewModule,
    SaveUser,
    VerifyLecturer,
    GetUserDetails,
    ResetPasswordRequest,
    SaveQuiz,
    GetQuizQuestions,
    JoinModule,
    SaveStudentResponse,
    EndQuiz,
    GetQuizResult,
    GetQuizReview,
    GetModuleMembers,
    RemoveModuleMember,
    GetQuizMembers,
    EditScore,
    GetQuizDetails,
    UpdateQuiz,
    GetLeaderboard,
    GetFeedback,
    GetStudentHistory,
    AbortQuiz,
    SubmitNewPassword
];

module.exports = routes;
