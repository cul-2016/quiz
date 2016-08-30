import React, { PropTypes } from 'react'; 
import Nav from './general/nav';

const Leaderboard = ({ leaderboard, username }) => {

    let mappedLeaderboard = leaderboard.map((user, i) => {
        return (
                <div className="box narrow" key={ i }>
                    <div>
                    { `${user.username}: ${user.average}` }
                    </div>
                </div>
        );
    });

    return (
        <div>
            <Nav username={ username } />
            { mappedLeaderboard }
        </div>
    );
};

Leaderboard.propTypes = {
    leaderboard: PropTypes.array.isRequired,
    username: PropTypes.string
};

export default Leaderboard;
