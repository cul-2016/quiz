import { connect } from 'react-redux';
import GroupAdminDashboard from '../../components/group-admin/dashboard';
import * as actions from '../../actions/group-admin';

const mapStateToProps = (state) => ({
    lecturers: state.groupAdmin.lecturers,
    groupAdminId: state.user.user_id
});




const GroupAdminDashboardContainer = connect(mapStateToProps, actions)(GroupAdminDashboard);

export default GroupAdminDashboardContainer;
