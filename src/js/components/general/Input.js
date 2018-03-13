import React, { PropTypes } from 'react';

const Input = ({updateInput, className, type, name, value }) => {

    return (
        <div className="form__field f-body">
            <label className="form__label">{name}</label>
            <input
                onChange={ (e) => { 'hello', 'e.target.value', e.target.value; updateInput(e.target.value, name)} }
                className={ className }
                value={ value }
                type={ type }
            />
        </div>
    );
};

Input.propTypes = {
    updateInput: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
};


export default Input;

