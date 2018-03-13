import React, { PropTypes } from 'react';

const Input = ({ updateInput, className, type, name, radioType, value }) => {

    return (
        <div className="form__field f-body form__radio-individual">
            <label className="form__label">{value}</label>
            <input
                onChange={() => updateInput(value, radioType)}
                className={className}
                value={value}
                type={type}
                checked={name === value}
            />
        </div>
    );
};

Input.propTypes = {
    updateInput: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    radioType: PropTypes.string.isRequired,
    value: PropTypes.string,
};


export default Input;

