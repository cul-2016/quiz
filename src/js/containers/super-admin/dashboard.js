import { connect } from 'react-redux';
import SuperAdminDashboard from '../../components/super-admin/dashboard';
import * as actions from '../../actions/super-admin';

const mapStateToProps = (state) => ({
    students: state.superAdmin.students,
    lecturers: state.superAdmin.lecturers,
    superAdminId: state.user.user_id
});

const mapDispatchToProps = (dispatch) => ({
    handleDeleteUser: (user_id) => {
        dispatch(actions.deleteUser(user_id));
    },
    handleDownloadData: (url) => {
        dispatch(actions.downloadData(url));
    }
});

const SuperAdminDashboardContainer = connect(mapStateToProps, mapDispatchToProps)(SuperAdminDashboard);

export default SuperAdminDashboardContainer;
