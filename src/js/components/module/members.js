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

    showQuizHistory (user_id, module_id) {

        this.props.getStudentHistory(user_id, module_id);
        this.setState({
            isQuizHistoryVisible: true
        });
    }

    hideQuizHistory () {

        this.props.clearStudentHistory();
        this.setState({
            isQuizHistoryVisible: false
        });
    }

    showConfirmModal (user_id, module_id, email, username) {

        this.setState({
            isConfirmModalVisible: true,
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

        let { members, name, isFetchingMembers, isRemovingMember, handleRemovingMember, params, history, medalConditions } = this.props; //eslint-disable-line no-unused-vars

        let module_id = params.module_id;

        let mappedMembers = members.map((member, i) => {

            return (
                <tr key={ i }>
                    <td>{ member.user_id }</td>
                    <td>{ member.email }</td>
                    <td>{ member.username }</td>
                    <td title="Quiz scores" className="is-icon" onClick={ () => this.showQuizHistory(member.user_id, module_id) }>
                        <span className="tag is-warning is-medium">
                            <i className="fa fa-list-ol" />
                        </span>
                    </td>
                    <td
                        title="Delete student"
                        className="is-icon"
                        onClick={ () => this.showConfirmModal(member.user_id, module_id, member.email, member.username) }>
                        <span className="tag is-danger is-medium">
                            <i className="fa fa-user-times" />
                        </span>
                    </td>
                </tr>
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

                        <h1 className="has-text-centered">{ `Students registered to ${name}` }</h1>
                        <div className="column">
                            <Link to={ `/${this.props.params.module_id}/lecturer` }>
                                <button className="button is-3 is-light is-inverted">
                                    <span className="icon">
                                        <i className="fa fa-chevron-left"></i>
                                    </span>
                                    <span>Back to { this.props.params.module_id }</span>
                                </button>
                            </Link>
                        </div>

                        <QuizHistoryModal
                            isVisible={ this.state.isQuizHistoryVisible }
                            history={ history }
                            hide={ this.hideQuizHistory }
                            username={ 'Mina' }
                            medalConditions={ medalConditions } />

                        <ConfirmModal
                            isVisible={ this.state.isConfirmModalVisible }
                            hide={ this.hideConfirmModal }
                            removeMember={ handleRemovingMember }
                            user_id={ this.state.user_id }
                            module_id={ this.state.module_id }
                            email={ this.state.email }
                            username={ this.state.username } />

                        <section className="section table-container">

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Unique ID</th>
                                        <th>Email address</th>
                                        <th>Nickname</th>
                                        <th colSpan="2"><em>Settings</em></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { mappedMembers }
                                </tbody>
                            </table>
                        </section>
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
