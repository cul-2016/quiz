import React, { PropTypes } from 'react';
import Trophies from './trophies';
import Medals from './medals';

const Details = ({ name, module_id, num_enrolled, trophies, medals }) => {

    return (
        <div className="box">
            <h3>{ name }</h3>
            <h5>{ module_id }</h5>
            <p>{ `Users: ${+num_enrolled}` }</p>
            <Trophies trophies={ trophies } />
            <Medals medals={ medals } />
        </div>
    );
};

Details.propTypes = {
    name: PropTypes.string,
    module_id: PropTypes.number,
    num_enrolled: PropTypes.number,
    trophies: PropTypes.array,
    medals: PropTypes.array
};

export default Details;
