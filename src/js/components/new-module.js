import React from 'react';


const NewModule = () => {

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
                <span>Bronze</span>
                <input type="number" />
                <span>Silver</span>
                <span>Gold</span>
            </div>
        </div>
    );
};

export default NewModule;
