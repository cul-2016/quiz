import React, { PropTypes } from 'react';
import Trophies from './trophies';
import Medals from './medals';
import { Link } from 'react-router';

const Details = ({ name, module_id, num_enrolled, trophies, medals }) => {

    return (
        <div>
            <div className="has-text-centered">

                <h1>{ name }</h1>
                <h4>{ module_id }</h4>

                <h5>
                    <i className="fa fa-users" />
                    { `${+num_enrolled} students have registered` }
                </h5>
            </div>

            <div className="button-panel has-text-centered">

                <Link to={ `${module_id}/members` }>
                    <button className="button is-warning">
                        <span className="icon">

                            <i className="fa fa-cog" />
                        </span>
                        <span>Manage students</span>
                    </button>
                </Link>

                <Link to={ `${module_id}/leaderboard` }>
                    <button className="button is-info">
                        View leaderboard
                    </button>
                </Link>
            </div>


            <div className="columns">
                <Trophies trophies={ trophies } />
                <Medals medals={ medals } />
            </div>
        </div>
    );
};

Details.propTypes = {
    name: PropTypes.string,
    module_id: PropTypes.string,
    num_enrolled: PropTypes.number,
    trophies: PropTypes.object,
    medals: PropTypes.object
};

export default Details;
