import { connect } from 'react-redux';
import Members from '../components/module/members';
import { removeModuleMember } from '../actions/module';

const mapStateToProps = (state) => ({
    users: state.module.users,
    isFetchingModuleMembers: state.module.isFetchingModuleMembers,
    isRemovingMember: state.module.isRemovingMember,
    username: state.user.username
});

const mapDispatchToProps = (dispatch) => ({

    handleRemovingUser: (module_id, user_id) => {

        dispatch(removeModuleMember(module_id, user_id));
    }
});
const ModuleMembersContainer = connect(mapStateToProps, mapDispatchToProps)(Members);

export default ModuleMembersContainer;
