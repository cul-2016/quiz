import { connect } from 'react-redux';
import GroupAdminDashboard from '../../components/group-admin/dashboard';
import * as actions from '../../actions/group-admin';

const mapStateToProps = (state) => ({
    lecturers: state.groupAdmin.lecturers,
    user_count: state.groupAdmin.user_count,
    user_limit: state.groupAdmin.user_limit,
    groupAdminId: state.user.user_id
});

const mapDispatchToProps = (dispatch) => ({
    updateUserIsActive: (user_id) => {
        dispatch(actions.updateUserIsActive(user_id));
    },
    handleDownloadData: (url) => {
        dispatch(actions.downloadData(url));
    }
});


const GroupAdminDashboardContainer = connect(mapStateToProps, mapDispatchToProps)(GroupAdminDashboard);

export default GroupAdminDashboardContainer;
