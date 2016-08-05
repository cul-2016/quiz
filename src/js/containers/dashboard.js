import { connect } from 'react-redux';
import Dashboard from '../components/dashboard';
import { store } from '../store';
import { listenForUserState } from '../lib/subscriptions';

listenForUserState(store);

const mapStateToProps = (state) => ({

    modules: state.dashboard.data
});

const DashboardContainer = connect(mapStateToProps)(Dashboard);

export default DashboardContainer;
