import { connect } from 'react-redux';
import SuperAdminDashboard from '../../components/super-admin/dashboard';
import * as actions from '../../actions/super-admin';

const mapStateToProps = (state) => ({
    students: state.superAdmin.students,
    lecturers: state.superAdmin.lecturers
});

const mapDispatchToProps = (dispatch) => ({
    handleDeleteUser: (user_id) => {
        dispatch(actions.deleteUser(user_id));
    }
});

const SuperAdminDashboardContainer = connect(mapStateToProps, mapDispatchToProps)(SuperAdminDashboard);

export default SuperAdminDashboardContainer;
