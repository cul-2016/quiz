import { connect } from 'react-redux';
import LecturerDashboard from '../components/lecturer/dashboard';


const mapStateToProps = (state) => ({

    modules: state.dashboard.data
});

const LecturerDashboardContainer = connect(mapStateToProps)(LecturerDashboard);

export default LecturerDashboardContainer;
