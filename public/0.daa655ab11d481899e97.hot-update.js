webpackHotUpdate(0,{

/***/ 349:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(3), RootInstanceProvider = __webpack_require__(11), ReactMount = __webpack_require__(13), React = __webpack_require__(82); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(82);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _questions = __webpack_require__(350);
	
	var _questions2 = _interopRequireDefault(_questions);
	
	var _nav = __webpack_require__(338);
	
	var _nav2 = _interopRequireDefault(_nav);
	
	var _classnames = __webpack_require__(282);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NewQuiz = function NewQuiz(_ref) {
	    var newQuiz = _ref.newQuiz;
	    var handleAddQuestion = _ref.handleAddQuestion;
	    var handleDeleteQuestion = _ref.handleDeleteQuestion;
	    var handleInputChange = _ref.handleInputChange;
	    var handleQuizNameChange = _ref.handleQuizNameChange;
	    var handleSaveQuiz = _ref.handleSaveQuiz;
	    var location = _ref.location;
	    var username = _ref.username;
	
	
	    var questionsValidation = newQuiz.questions.map(function (question) {
	        if (!question.question || !question.a || !question.b || !question.correct_answer) {
	            return false;
	        } else {
	            return true;
	        }
	    }).every(function (elem) {
	        return elem;
	    });
	
	    var submitClasses = (0, _classnames2.default)("button is-success save-question", {
	        "is-disabled": !newQuiz.name || questionsValidation === false,
	        "is-loading": newQuiz.isSavingQuiz
	    });
	    var quizNameClasses = (0, _classnames2.default)("help is-danger", {
	        "display-none": newQuiz.name
	    });
	
	    return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_nav2.default, { username: username }),
	        _react2.default.createElement(
	            'div',
	            { className: 'column is-6 is-offset-3 has-text-centered' },
	            _react2.default.createElement(
	                'label',
	                { className: 'label' },
	                'New Quiz name'
	            ),
	            _react2.default.createElement('input', {
	                className: 'input',
	                type: 'text',
	                defaultValue: newQuiz.name,
	                onChange: function onChange(e) {
	                    return handleQuizNameChange(e.target.value);
	                },
	                placeholder: 'Quiz Name' }),
	            _react2.default.createElement(
	                'span',
	                { className: quizNameClasses },
	                'Please enter a Quiz Name'
	            )
	        ),
	        _react2.default.createElement(_questions2.default, {
	            questions: newQuiz.questions,
	            handleInputChange: handleInputChange,
	            handleDeleteQuestion: handleDeleteQuestion }),
	        _react2.default.createElement(
	            'div',
	            { className: 'column is-8 is-offset-2 has-text-centered' },
	            _react2.default.createElement(
	                'button',
	                { className: 'button is-info add-question', onClick: handleAddQuestion },
	                'Add Question'
	            ),
	            _react2.default.createElement(
	                'button',
	                { className: submitClasses, onClick: function onClick() {
	                        return handleSaveQuiz(location.pathname.split('/')[1], newQuiz.name, newQuiz.questions);
	                    } },
	                'Save and Exit'
	            )
	        )
	    );
	};
	
	NewQuiz.propTypes = {
	    newQuiz: _react.PropTypes.object.isRequired,
	    handleAddQuestion: _react.PropTypes.func.isRequired,
	    handleDeleteQuestion: _react.PropTypes.func.isRequired,
	    handleInputChange: _react.PropTypes.func.isRequired,
	    handleQuizNameChange: _react.PropTypes.func.isRequired,
	    handleSaveQuiz: _react.PropTypes.func.isRequired,
	    location: _react.PropTypes.object.isRequired,
	    username: _react.PropTypes.string
	};
	
	exports.default = NewQuiz;
	
	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(277); if (makeExportsHot(module, __webpack_require__(82))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "new-quiz.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }

})
//# sourceMappingURL=0.daa655ab11d481899e97.hot-update.js.map