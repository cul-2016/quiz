import React, { PropTypes } from 'react';

const Medals = ({ applyOffset, updateMedalVals, medals }) => {
    return (
        <div>
            <h3>Medals</h3>

            <label className="label">Bronze</label>
            <span className="label">0 to </span>
            <input className="input" name="bronze" type="number" min="1" max="96" defaultValue={ applyOffset(medals[0], -1) } onChange={ (e) => updateMedalVals('bronze', e.target.value) } />
            <label className="label">Silver</label>
            <span className=" label silver lower-bound">{ medals[0] } </span><span className="label"> to </span><span className=" label silver upper-bound">{ medals[1] }</span>
            <label className="label">Gold</label>
            <input className="input" name="gold" type="number" min="4" max="99" defaultValue={ applyOffset(medals[1], 1) } onChange={ (e) => updateMedalVals('gold', e.target.value) } />
            <span className="label"> to 100</span>
        </div>
    );
};

Medals.propTypes = {
    applyOffset: PropTypes.func.isRequired,
    updateMedalVals: PropTypes.func.isRequired,
    medals: PropTypes.array.isRequired
};

export default Medals;
