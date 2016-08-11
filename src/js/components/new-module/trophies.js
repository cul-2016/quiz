import React, { PropTypes } from 'react';

const Trophies = ({ trophies, updateTrophyVals }) => {

    let mappedTrophies = trophies.trophy_name.map((name, i) => {

        return (
            <div className="column card" key={ i }>
                <label className="label">{ name }</label>
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
        <div className="new-module-trophies">
            <h3>Trophies</h3>
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
