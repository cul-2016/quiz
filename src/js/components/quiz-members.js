import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Spinner from './general/spinner';
import QuizMembersModal from './quiz-members-modal';


class QuizMembers extends Component {

    constructor (props) {
        super(props);
        this.state = {
            isModalVisible: false
        };
        this.showQuizQuestions = this.showQuizQuestions.bind(this);
        this.hideQuizQuestions = this.hideQuizQuestions.bind(this);
    }

    showQuizQuestions () {
        this.setState({
            isModalVisible: true
        });
    }

    hideQuizQuestions () {
        this.setState({
            isModalVisible: false
        });
    }

    render () {

        let { members, isFetchingQuizMembers, questions, params } = this.props;

        let mappedMembers = members.map((member, i) => {
            return (
                <div key={i} className="column is-8 is-offset-2 ">
                    <div className="columns quiz-members">
                        <div className="column is-5 email">
                            <p>{ member.email }</p>
                        </div>
                        <div className="column is-3 username">
                            <p>{ member.username }</p>
                        </div>
                        <div className="column is-1 score">
                            <p>{ member.score }</p>
                        </div>
                        <div className="column is-2 edit-score-button">
                            <Link to={ `${params.module_id}/${params.quiz_id}/${i}/edit-score` }>
                                <button className="button is-warning">Edit Score</button>
                            </Link>
                        </div>
                    </div>
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
                    <div className="quiz-members">
                        <button className="button" onClick={ () => this.showQuizQuestions() }>
                            Show quiz questions
                        </button>
                        <QuizMembersModal isVisible={ this.state.isModalVisible } questions={ questions } hide={ this.hideQuizQuestions }/>
                        <div>
                            <h2 className="has-text-centered"> Quiz Members </h2>
                            <div className="column is-8 is-offset-2">
                                <div className="columns">
                                    <div className="column is-5">
                                        <label className="label">Email</label>
                                    </div>
                                    <div className="column is-3">
                                        <label className="label">Nickname</label>
                                    </div>
                                    <div className="column is-3">
                                        <label className="label">Score</label>
                                    </div>
                                </div>
                            </div>
                            { mappedMembers }
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
    questions: PropTypes.array
};

export default QuizMembers;
