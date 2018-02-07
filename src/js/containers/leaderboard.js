import { connect } from 'react-redux';
import Leaderboard from '../components/leaderboard/leaderboard';


const mapStateToProps = (state) => ({
    mainData: state.leaderboard.mainData,
    medalScores: state.leaderboard.medalScores,
    quiz_id_list: state.leaderboard.quiz_id_list,
    medalCondition: state.module.medals.condition,
    uses_trophies: state.leaderboard.uses_trophies
});

const LeaderboardContainer = connect(mapStateToProps)(Leaderboard);

export default LeaderboardContainer;
