import { connect } from 'react-redux';
import holdingPage from '../components/holding-page';

const mapStateToProps = state => ({
    is_lecturer: state.user.is_lecturer
});

const holdingPageContainer = connect(mapStateToProps)(holdingPage);

export default holdingPageContainer;
