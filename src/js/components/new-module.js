import React, { PropTypes } from 'react';


const NewModule = ({ medals, trophies, updateMedalVals, updateTrophyVals }) => {

    const doMaths = (originalValue, offset) => {

        return !isNaN(originalValue) ? originalValue + offset : '-';
    };

    const trophyComponent = trophies.trophy_name.map((name, i) => {

        return (
            <div key={ i }>
                <span>{ name }</span>
                <input type="number" min="1" max="100" defaultValue={ trophies.condition[i] } onChange={ (e) => updateTrophyVals(name, e.target.value) } />
            </div>
        );
    });

    return (
        <div>
            <h1>Add a new module</h1>
            <div>
                <label>Code</label>
                <input name="module_id" type="text" maxLength="4" />
                <label>Module name</label>
                <input name="name" type="text" />
            </div>
            <br />
            <div>
                <h3>Medals</h3>
                <p>Bronze</p>
                <span>0 to </span>
                <input name="bronze" type="number" min="1" max="96" defaultValue={ doMaths(medals[0], -1) } onChange={ (e) => updateMedalVals('bronze', e.target.value) } />
                <p>Silver</p>
                <span className="silver lower-bound">{ medals[0] }</span> to <span className="silver upper-bound">{ medals[1] }</span>
                <p>Gold</p>
                <input name="gold" type="number" min="4" max="99" defaultValue={ doMaths(medals[1], 1) } onChange={ (e) => updateMedalVals('gold', e.target.value) } />
                <span> to 100</span>
            </div>
            <div>
                <h3>Trophies</h3>
                { trophyComponent }
            </div>
        </div>
    );
};

NewModule.propTypes = {
    medals: PropTypes.array.isRequired,
    trophies: PropTypes.object.isRequired,
    updateMedalVals: PropTypes.func.isRequired,
    updateTrophyVals: PropTypes.func.isRequired
};

export default NewModule;
