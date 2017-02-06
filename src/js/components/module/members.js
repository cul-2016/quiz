import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Spinner from '../general/spinner';
import QuizHistoryModal from './quiz-history-modal';
import ConfirmModal from '../general/confirm-modal';


class Members extends Component {

    constructor (props) {
        super(props);
        this.state = {
            isQuizHistoryVisible: false,
            isConfirmModalVisible: false,
            user_id: undefined,
            module_id: undefined,
            email: undefined,
            username: undefined
        };
        this.showQuizHistory = this.showQuizHistory.bind(this);
        this.hideQuizHistory = this.hideQuizHistory.bind(this);
        this.showConfirmModal = this.showConfirmModal.bind(this);
        this.hideConfirmModal = this.hideConfirmModal.bind(this);
    }

    showQuizHistory (user_id, module_id, username) {

        this.props.getStudentHistory(user_id, module_id);
        this.setState({
            isQuizHistoryVisible: true,
            username
        });
    }

    hideQuizHistory () {

        this.props.clearStudentHistory();
        this.setState({
            isQuizHistoryVisible: false,
            username: undefined
        });
    }

    showConfirmModal (user_id, module_id, email, username) {
        this.setState({
            isConfirmModalVisible: !this.state.isConfirmModalVisible,
            user_id,
            module_id,
            email,
            username
        });
    }

    hideConfirmModal () {

        this.setState({
            isConfirmModalVisible: false,
            user_id: undefined,
            module_id: undefined,
            email: undefined,
            username: undefined
        });
    }

    render () {

        let { members, name, isFetchingMembers, isRemovingMember, handleRemovingMember, params, history, medalConditions } = this.props;
        let module_id = params.module_id;

        let mappedMembers = members.map((member, i) => {

            return (
                <div className="member" key={ i }>

                    <div className="member__details">
                      <p className="f-label f-label--dark">{ member.username }</p>
                      <p className="f-small-body f-small-body--slim">{ member.email }</p>
                    </div>
                    <div className="member__view-details" onClick={ () => this.showQuizHistory(member.user_id, module_id, member.username) }>
                        <span className="f-body f-body--primary">All Results</span>
                        <span className="icon">
                          <i className="fa fa-caret-down" />
                        </span>
                    </div>
                    <div className="member__view-remove-member" onClick={ () => handleRemovingMember(member.user_id, module_id) } >
                        <p className="f-body f-body--primary" > Remove </p>
                    </div>

                    <QuizHistoryModal

                      member={ member }
                      isVisible={ this.state.isQuizHistoryVisible }
                      history={ history }
                      hide={ this.hideQuizHistory }
                      username={ this.state.username } />
                </div>
            );
        });

        return (
            <div>
            {
                isFetchingMembers || isRemovingMember && <Spinner />
            }
            {
                !isFetchingMembers && members &&
                <div className="module-members container">
                    <div className="container average">
                        <ul className="navbar navbar--invisible">
                            <li className="navbar__item">
                                <Link to={ `${module_id}/lecturer` } className="f-body navbar__link navbar__link--left navbar__link--quit">
                                  Back
                                </Link>
                            </li>
                        </ul>

                        <div className="content__body">
                          <p className="f-headline">Students</p>
                          <p className="f-title">In {name}</p>
                          <section className="section">
                                { mappedMembers }
                          </section>

                        </div>

                    </div>
                </div>
            }
            </div>
        );
    }
}

Members.propTypes = {
    members: PropTypes.array,
    name: PropTypes.string.isRequired,
    isFetchingMembers: PropTypes.bool.isRequired,
    isRemovingMember: PropTypes.bool.isRequired,
    handleRemovingMember: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    getStudentHistory: PropTypes.func.isRequired,
    clearStudentHistory: PropTypes.func.isRequired,
    history: PropTypes.array.isRequired,
    medalConditions: PropTypes.array,
};

export default Members;
