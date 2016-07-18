import React, { PropTypes } from 'react';


const NewModule = ({ medals, updateValues }) => {

    const doMaths = (originalValue, offset) => {
    
        return !isNaN(originalValue) ? originalValue + offset : '-';
    };

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
                <p>Bronze</p>
                <span>0 to </span>
                <input name="bronze" type="number" min="1" max="96" defaultValue={ doMaths(medals[0], -1) } onChange={ (e) => updateValues('bronze', e.target.value) } />
                <p>Silver</p>
                <span className="silver lower-bound">{ medals[0] }</span> to <span className="silver upper-bound">{ medals[1] }</span>
                <p>Gold</p>
                <input name="gold" type="number" min="4" max="99" defaultValue={ doMaths(medals[1], 1) } onChange={ (e) => updateValues('gold', e.target.value) } />
                <span> to 100</span>
            </div>
        </div>
    );
};

NewModule.propTypes = {
    medals: PropTypes.array.isRequired,
    updateValues: PropTypes.func.isRequired
};

export default NewModule;
