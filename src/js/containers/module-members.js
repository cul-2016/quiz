import { connect } from 'react-redux';
import Members from '../components/module/members';
import { removeModuleMember } from '../actions/module';
import { getStudentHistory, clearStudentHistory } from '../actions/student-history';

const mapStateToProps = (state) => ({
    members: state.module.members,
    name: state.module.name,
    isFetchingMembers: state.module.isFetchingMembers,
    isRemovingMember: state.module.isRemovingMember,
    history: state.studentHistory.history || [],
    medalConditions: state.module.medals.condition
});

const mapDispatchToProps = (dispatch) => ({

    handleRemovingMember: (user_id, module_id) => {

        dispatch(removeModuleMember(user_id, module_id));
    },

    getStudentHistory: (user_id, module_id) => {
        dispatch(getStudentHistory(user_id, module_id));
    },

    clearStudentHistory: () => {

        dispatch(clearStudentHistory());
    }
});

const ModuleMembersContainer = connect(mapStateToProps, mapDispatchToProps)(Members);

export default ModuleMembersContainer;
