import React, { PropTypes } from 'react';
import Trophies from './trophies.js';
import Medals from './medals.js';
import { Link } from 'react-router';

const Details = ({ name, module_id, num_enrolled, trophies, medals }) => {

    return (
        <div>
            <h1 className="display">{ name }</h1>
            <h4 className="body body__primary">{ module_id }</h4>

            <div className="module__buttons">
                <Link to={ `${module_id}/leaderboard` }>
                    <button className="button module__button">
                        View leaderboard
                    </button>
                </Link>

                <Link to={ `${module_id}/members` }>
                    <button className="button button__icon--right module__button">
                        { +num_enrolled } Students <span className="fa-chevron-right"></span>
                    </button>
                </Link>
            </div>

            <div className="line"></div>

            <div className="module__medals-and-trophies">
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
