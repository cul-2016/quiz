import React, { PropTypes } from 'react';
import normaliseText from '../../lib/normaliseText';

const Trophies = ({ trophies, updateTrophyVals }) => {

    let mappedTrophies = trophies.trophy_name.map((name, i) => {

        return (
            <div className="column box is-info has-text-centered" key={ i }>
                <label className="f-label">{ normaliseText(name) }</label>
                <input
                       type="number"
                       min="1"
                       max="100"
                       defaultValue={ trophies.condition[i] }
                       onChange={ (e) => updateTrophyVals(name, e.target.value) } />
            </div>
        );
    });

    return (
        <div className="new-module-trophies section">

            <h3>
                <i className="fa fa-trophy" /> Trophies
            </h3>
            <div className="columns">
                { mappedTrophies }
            </div>
        </div>
    );
};

Trophies.propTypes = {
    trophies: PropTypes.object.isRequired,
    updateTrophyVals: PropTypes.func.isRequired
};

export default Trophies;
