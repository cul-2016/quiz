import React, { PropTypes } from 'react';
import Trophies from './trophies';
import Medals from './medals';

const Details = ({ name, module_id, num_enrolled, trophies, medals }) => {

    return (
        <div>
            <div className="section has-text-centered">

                <h2>{ name }</h2>
                <h5>{ module_id }</h5>
                <h5><i className="fa fa-users" /> { `${+num_enrolled} students have registered` }</h5>
            </div>

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
