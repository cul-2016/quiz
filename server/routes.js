const index = require('./handlers/index.js');

const getModuleList = require('./handlers/get-module-list.js');
const getModule = require('./handlers/get-module.js');
const validateModule = require('./handlers/validate-module.js');
const addNewModule = require('./handlers/add-new-module.js');
const joinModule = require('./handlers/join-module.js');
const getModuleMembers = require('./handlers/get-module-members.js');
const removeModuleMember = require('./handlers/remove-module-member.js');

const saveUser = require('./handlers/save-user.js');
const verifyLecturer = require('./handlers/verify-user.js');
const getUserDetails = require('./handlers/get-user-details.js');
const resetPasswordRequest = require('./handlers/reset-password-request.js');
const submitNewPassword = require('./handlers/submit-new-password.js');

const saveQuiz = require('./handlers/save-quiz.js');
const getQuizQuestions = require('./handlers/get-quiz-questions.js');
const endQuiz = require('./handlers/end-quiz.js');
const getQuizResult = require('./handlers/get-quiz-result.js');
const getQuizReview = require('./handlers/get-quiz-review.js');
const getQuizMembers = require('./handlers/get-quiz-members.js');
const editScore = require('./handlers/edit-score.js');
const getQuizDetails = require('./handlers/get-quiz-details.js');
const updateQuiz = require('./handlers/update-quiz.js');
const abortQuiz = require('./handlers/abort-quiz.js');

const saveStudentResponse = require('./handlers/save-student-response.js');
const getLeaderboard = require('./handlers/get-leaderboard.js');
const getFeedback = require('./handlers/get-feedback.js');
const getStudentHistory = require('./handlers/get-student-history.js');

const routes = [
    index,
    getModuleList,
    getModule,
    validateModule,
    addNewModule,
    saveUser,
    verifyLecturer,
    getUserDetails,
    resetPasswordRequest,
    saveQuiz,
    getQuizQuestions,
    joinModule,
    saveStudentResponse,
    endQuiz,
    getQuizResult,
    getQuizReview,
    getModuleMembers,
    removeModuleMember,
    getQuizMembers,
    editScore,
    getQuizDetails,
    updateQuiz,
    getLeaderboard,
    getFeedback,
    getStudentHistory,
    abortQuiz,
    submitNewPassword
];

module.exports = routes;
