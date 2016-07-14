import React, { PropTypes } from 'react';


const NewModule = ({ medals, updateValues }) => {

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
                <span>0</span>
                <input name="bronze" type="number" defaultValue={ medals[0] - 1 } onChange={ (e) => updateValues('bronze', e.target.value) } />
                <p>Silver</p>
                <span>{ medals[0] }</span> to <span>{ medals[1] }</span>
                <p>Gold</p>
                <input name="gold" type="number" defaultValue={ medals[1] + 1 } onChange={ (e) => updateValues('bronze', e.target.value) } />
                <span>100</span>
            </div>
        </div>
    );
};

NewModule.propTypes = {
    medals: PropTypes.array.isRequired,
    updateValues: PropTypes.func.isRequired
};

export default NewModule;
