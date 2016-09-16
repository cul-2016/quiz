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
                <Link to={ `${module_id}/members` }>
                <h5><i className="fa fa-users" /> { `${+num_enrolled} students have registered` }</h5>
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
