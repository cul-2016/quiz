import React, { PropTypes } from 'react';


const Leaderboard = ({ leaderboard }) => {

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
            { mappedLeaderboard }
        </div>
    );
};

Leaderboard.propTypes = {
    leaderboard: PropTypes.array.isRequired
};

export default Leaderboard;
