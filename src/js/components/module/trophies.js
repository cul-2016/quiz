import React, { PropTypes } from 'react';
import normaliseText from '../../lib/normaliseText';


const Trophies = ({ trophies }) => {

    const mappedTrophies = trophies.trophy_name.map((name, i) => {

        return (
            <div className="box column has-text-centered" key={ i }>
                <div className="label">{ normaliseText(name) }</div>
                <div>{ trophies.condition[i] }</div>
            </div>
        );
    });

    return (
        <div className="section">
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
