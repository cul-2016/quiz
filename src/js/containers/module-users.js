import { connect } from 'react-redux';
import Users from '../components/module/users';
import { removeUserFromModule } from '../actions/module';

const mapStateToProps = (state) => ({
    users: state.module.users,
    isFetchingModuleUsers: state.module.isFetchingModuleUsers,
    username: state.user.username
});

const mapDispatchToProps = (dispatch) => ({

    handleRemovingUser: (module_id, user_id) => {

        dispatch(removeUserFromModule(module_id, user_id));
    }
});
const ModuleUsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default ModuleUsersContainer;
