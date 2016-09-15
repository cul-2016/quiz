import React, { PropTypes } from 'react';
import normaliseText from '../../lib/normaliseText';

const Trophies = ({ trophies, updateTrophyVals }) => {

    let mappedTrophies = trophies.trophy_name.map((name, i) => {

        return (
            <div className="columns" key={ i }>
                <div className="column box is-info has-text-centered">
                    <label className="label">{ normaliseText(name) }</label>
                    <input
                           type="number"
                           min="1"
                           max="100"
                           defaultValue={ trophies.condition[i] }
                           onChange={ (e) => updateTrophyVals(name, e.target.value) } />
                </div>
            </div>

        );
    });

    return (
        <div className="section column">

            <h3>
                <i className="fa fa-star" /> Trophies
            </h3>
                { mappedTrophies }
        </div>
    );
};

Trophies.propTypes = {
    trophies: PropTypes.object.isRequired,
    updateTrophyVals: PropTypes.func.isRequired
};

export default Trophies;
