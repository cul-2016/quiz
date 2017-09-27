import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Spinner from './general/spinner';
import EditScoreModal from './edit-score-modal';
import { store } from '../store.js';


class QuizMembers extends Component {

    constructor (props) {
        super(props);
        this.state = {
            isQuizQuestionsVisible: false,
            isEditScoreVisible: false,
            member_key: undefined
        };
        this.showQuizQuestions = this.showQuizQuestions.bind(this);
        this.hideQuizQuestions = this.hideQuizQuestions.bind(this);
        this.showEditScore = this.showEditScore.bind(this);
        this.hideEditScore = this.hideEditScore.bind(this);
    }

    showQuizQuestions () {
        this.setState({
            isQuizQuestionsVisible: true
        });
    }

    showEditScore (member_key) {
        this.setState({
            member_key,
            isEditScoreVisible: true
        });
    }

    hideEditScore () {
        this.setState({
            isEditScoreVisible: false
        });
    }

    hideQuizQuestions () {
        this.setState({
            isQuizQuestionsVisible: false
        });
    }

    getQuizName () {
        let quizzesArray = store.getState().module.quizzes;
        let quiz_id = parseInt(this.props.params.quiz_id);

        return quizzesArray.filter((quiz) => {
            return quiz_id === quiz.quiz_id;
        }).map((quiz) => {
            return quiz.name;
        })[0];
    }
    render () {


        let { members, isFetchingQuizMembers, questions, params, handleUpdateScore, handleEditScore, isSurvey } = this.props;
        let quizName = this.getQuizName();

        let mappedMembers = members.map((member, i) => {
            return (
                <div key={ i } className="quiz-member">
                    <div className="member__details">
                      <p className="f-label f-label--dark">{ member.username }</p>
                      <p className="f-small-body f-small-body--slim">{ member.email }</p>
                    </div>
                    {
                      !isSurvey &&
                      <div className="member__score-details">
                          <div className="member__score">
                            <p>{ member.score } / {questions.length}</p>
                          </div>
                          <div className="member__score-percentage">
                            <p>{ Math.round((member.score  / questions.length) * 100) }%</p>
                          </div>
                          <div className="member__edit-score" onClick={ () => this.showEditScore(i) }>
                            <p className="f-body f-body--primary">Edit Score</p>
                          </div>
                      </div>
                    }

                    <EditScoreModal
                      member={ member }
                      isVisible={ this.state.isEditScoreVisible }
                      hide={ this.hideEditScore }
                      member_key={ this.state.member_key }
                      members={ store.getState().quizMembers.members }
                      quiz_id={ params.quiz_id }
                      module_id={ params.module_id }
                      handleEditScore={ handleEditScore }
                      handleUpdateScore={ handleUpdateScore }/>

                </div>
            );
        });


        return (
            <div>
                {
                    isFetchingQuizMembers && <Spinner />
                }
                {
                    !isFetchingQuizMembers && members &&
                    <div className="quiz-members container average">

                      <ul className="navbar navbar--invisible">
                        <div className="navbar__inner">
                          <li className="navbar__item navbar__item--onlyone">
                              <Link to={ `${this.props.params.module_id}/lecturer` } className="f-body navbar__link">
                                Back
                              </Link>
                          </li>
                        </div>
                      </ul>

                      <div className="content__body">
                        <Link className="button review-quiz-button" to={ `${params.module_id}/${params.quiz_id}/members/quiz-review` }>Quiz Review</Link>
                          <p className="f-headline">Students&#39; Individual Scores</p>
                          <p className="f-title">In {quizName}</p>
                        <section className="members">
                            { mappedMembers }
                        </section>
                      </div>
                    </div>
                }
            </div>
        );
    }
}

QuizMembers.propTypes = {
    members: PropTypes.array,
    isFetchingQuizMembers: PropTypes.bool,
    params: PropTypes.object,
    questions: PropTypes.array,
    handleEditScore: PropTypes.func,
    handleUpdateScore: PropTypes.func,
    isSurvey: PropTypes.bool
};

export default QuizMembers;
