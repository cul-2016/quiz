import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const Leaderboard = ({ leaderboard, params }) => {

    let mappedLeaderboard = leaderboard.map((user, i) => {
        return (
                <li className="columns is-mobile" key={ i }>
                    <span className="rank-number column is-1">{ `${i + 1}` }</span>
                    <div className="column is-7">
                        <span className="subtitle is-4">{ user.username }</span>
                    </div>
                    <div className="column">
                        <span className="subtitle is-4">{ user.average }</span>
                    </div>
                </li>
        );
    });

    return (
        <div className="leaderboard">
            <div className="container average">
                <h1 className="has-text-centered">Leaderboard</h1>
                <div className="column">
                    <Link to={ `/${params.module_id}/lecturer` }>
                        <button className="button is-3 is-light">
                            <span className="icon">
                                <i className="fa fa-chevron-left"></i>
                            </span>
                            <span>Back to { params.module_id }</span>
                        </button>
                    </Link>
                </div>
                <div className="section average">
                    <div className="leaderboard-header columns is-mobile">
                        <div className="column is-7 is-offset-1">
                            Nickname
                        </div>
                        <div className="column">
                            Average score (%)
                        </div>
                    </div>
                    <ol>
                        { mappedLeaderboard }
                    </ol>
                </div>
            </div>
        </div>
    );
};

Leaderboard.propTypes = {
    leaderboard: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired
};

export default Leaderboard;
