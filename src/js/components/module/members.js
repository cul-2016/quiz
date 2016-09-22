import React, { Component, PropTypes } from 'react';
import Spinner from '../general/spinner';
import Modal from './modal';


class Members extends Component {

    constructor (props) {
        super(props);
        this.state = {
            isModalVisible: false
        };
        this.showQuizHistory = this.showQuizHistory.bind(this);
        this.hideQuizHistory = this.hideQuizHistory.bind(this);
    }

    showQuizHistory (user_id, module_id) {

        this.props.getStudentHistory(user_id, module_id);
        this.setState({
            isModalVisible: true
        });
    }

    hideQuizHistory () {

        this.props.clearStudentHistory();
        this.setState({
            isModalVisible: false
        });
    }

    render () {

        let { members, name, isFetchingMembers, isRemovingMember, handleRemovingMember, location, history, medalConditions } = this.props; //eslint-disable-line no-unused-vars

        let module_id = location.pathname.split('/')[1];

        let mappedMembers = members.map((member, i) => {

            return (
                <tr key={ i } className="">
                    <td>{ member.user_id }</td>
                    <td>{ member.email }</td>
                    <td>{ member.username }</td>
                    <td title="Quiz history" className="is-icon" onClick={ () => this.showQuizHistory(member.user_id, module_id) }>
                        <i className="fa fa-list-ol"/>
                    </td>
                    <td title="Delete student" className="is-icon" onClick={ () => this.handleRemovingMember(member.user_id, module_id) }>
                        <i className="fa fa-user-times" />
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
                <div className="module-members">
                    <h2 className="has-text-centered">{ `Students registered to ${name}` }</h2>
                    <Modal isVisible={ this.state.isModalVisible } history={ history } hide={ this.hideQuizHistory } username={ 'Mina' } medalConditions={ medalConditions } />
                    <section className="section table-container">

                        <table className="table is-narrow is-striped">
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
    location: PropTypes.object.isRequired,
    getStudentHistory: PropTypes.func.isRequired,
    clearStudentHistory: PropTypes.func.isRequired,
    history: PropTypes.array.isRequired,
    medalConditions: PropTypes.array
};

export default Members;
