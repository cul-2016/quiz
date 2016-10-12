import { connect } from 'react-redux';
import Leaderboard from '../components/leaderboard/leaderboard';

const mapStateToProps = (state) => ({
    mainData: state.leaderboard.mainData,
    medalScores: state.leaderboard.medalScores,
    quiz_id_list: state.leaderboard.quiz_id_list
});



const LeaderboardContainer = connect(mapStateToProps)(Leaderboard);

export default LeaderboardContainer;
