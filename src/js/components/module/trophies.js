import React, { PropTypes } from 'react';
import normaliseLabel from '../../lib/normaliseLabel';


const Trophies = ({ trophies }) => {

    const mappedTrophies = trophies.trophy_name.map((name, i) => {

        return (
            <div className="box column has-text-centered" key={ i }>
                <div className="label">{ normaliseLabel(name) }</div>
                <div>{ trophies.condition[i] }</div>
            </div>
        );
    });

    return (
        <div className="module-trophies">
            <h4>Trophies</h4>
            <div className="columns">

                { mappedTrophies }
            </div>
        </div>
    );
};

Trophies.propTypes = {
    trophies: PropTypes.object.isRequired
};

export default Trophies;
