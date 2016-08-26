import { connect } from 'react-redux';
import Leaderboard from '../components/leaderboard';

const mapStateToProps = (state) => ({
    leaderboard: state.leaderboard.leaderboard,
    username: state.user.username
});



const LeaderboardContainer = connect(mapStateToProps)(Leaderboard);

export default LeaderboardContainer;
