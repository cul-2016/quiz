import { connect } from 'react-redux';
import Dashboard from '../components/dashboard';


const mapStateToProps = (state) => ({

    modules: state.dashboard.data,
    is_lecturer: state.user.is_lecturer
});

const DashboardContainer = connect(mapStateToProps)(Dashboard);

export default DashboardContainer;
