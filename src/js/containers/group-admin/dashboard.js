import { connect } from 'react-redux';
import GroupAdminDashboard from '../../components/group-admin/dashboard';
import * as actions from '../../actions/group-admin';

const mapStateToProps = (state) => ({
    lecturers: state.groupAdmin.lecturers,
    user_count: state.groupAdmin.user_count,
    user_limit: state.groupAdmin.user_limit,
    groupAdminId: state.user.user_id
});




const GroupAdminDashboardContainer = connect(mapStateToProps, actions)(GroupAdminDashboard);

export default GroupAdminDashboardContainer;
