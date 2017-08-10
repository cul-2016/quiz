import { connect } from 'react-redux';
import SuperAdminDashboard from '../../components/super-admin/dashboard';
// import * as actions from '../actions/super-admin';

const mapStateToProps = (state) => ({
    students: state.superAdmin.students,
    lecturers: state.superAdmin.lecturers
});

const SuperAdminDashboardContainer = connect(mapStateToProps)(SuperAdminDashboard);

export default SuperAdminDashboardContainer;
