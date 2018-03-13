import React, { PropTypes } from 'react';
import Input from '../general/Input';
import RadioInput from '../general/radio-input';


const SuperAdminManageClient = ({ name, email, institution, department, accountType, paid, code, updateInput }) => {

    return (
        <div className="manage-client content__body">
            <form className="form">
                <Input
                  updateInput={ updateInput }
                  className="form__input"
                  type="text"
                  name="name"
                  value={ name }
                />
                <Input
                  updateInput={ updateInput }
                  className="form__input"
                  type="text"
                  name="email"
                  value={ email }
                />
                <Input
                  updateInput={ updateInput }
                  className="form__input"
                  type="text"
                  name="institution"
                  value={ institution }
                />
                <Input
                  updateInput={ updateInput }
                  className="form__input"
                  type="text"
                  name="department"
                  value={ department }
                />
                <div className="form__radio-group">
                    <RadioInput
                      updateInput={updateInput}
                      className="form__input"
                      type="radio"
                      name={accountType}
                      radioType='accountType'
                      value="individual lecturer"
                    />
                    <RadioInput
                      updateInput={updateInput}
                      className="form__input"
                      type="radio"
                      name={accountType}
                      radioType='accountType'
                      value="group lecturer"
                    />
                    <RadioInput
                      updateInput={updateInput}
                      className="form__input"
                      type="radio"
                      name={accountType}
                      radioType='accountType'
                      value="group admin"
                    />
                </div>
                <div className="form__radio-group">
                    <RadioInput
                      updateInput={updateInput}
                      className="form__input"
                      type="radio"
                      name={paid}
                      radioType='paid'
                      value="true"
                    />
                    <RadioInput
                      updateInput={updateInput}
                      className="form__input"
                      type="radio"
                      name={paid}
                      radioType='paid'
                      value="false"
                    />
                </div>


            </form>
        </div>
    )
};


SuperAdminManageClient.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    institution: PropTypes.string,
    department: PropTypes.string,
    accountType: PropTypes.string,
    paid: PropTypes.bool.isRequired,
    code: PropTypes.string,
    updateInput: PropTypes.func.isRequired
};


export default SuperAdminManageClient;