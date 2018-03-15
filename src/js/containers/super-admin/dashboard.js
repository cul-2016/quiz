import { connect } from 'react-redux';
import SuperAdminDashboard from '../../components/super-admin/dashboard';
import * as actions from '../../actions/super-admin';

const mapStateToProps = (state) => ({
    students: state.superAdmin.students,
    lecturers: state.superAdmin.lecturers,
    clients: state.superAdmin.clients,
    superAdminId: state.user.user_id
});

const mapDispatchToProps = (dispatch) => ({
    handleDeleteUser: (user_id) => {
        dispatch(actions.deleteUser(user_id));
    },
    handleDownloadData: (url) => {
        dispatch(actions.downloadData(url));
    },
    handleEditUser: (data) => {
        dispatch(actions.editUser(data));
    },
    handleClearClientForm: () => {
        dispatch(actions.clearClientForm());
    }
});

const SuperAdminDashboardContainer = connect(mapStateToProps, mapDispatchToProps)(SuperAdminDashboard);

export default SuperAdminDashboardContainer;
