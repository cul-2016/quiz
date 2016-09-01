import { connect } from 'react-redux';
import AppLoading from '../components/general/app-loading';

const mapStateToProps = (state) => ({
    userState: state.user
});

const AppLoadingContainer = connect(mapStateToProps)(AppLoading);

export default AppLoadingContainer;
