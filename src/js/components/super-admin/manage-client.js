import React, { PropTypes } from 'react';
import Input from '../general/Input';
import RadioInput from '../general/radio-input';
import isEmail from 'validator/lib/isEmail';


const SuperAdminManageClient = ({ name, isEditingClient, email, institution, department, accountType, paid, code, userLimit, updateInput, submitClient, displayError, error }) => {

    const handleSubmitClient = () => {
        if (name &&
            isEmail(email) &&
            ((accountType === 'group admin' && userLimit || accountType === 'individual lecturer') || (isEditingClient && userLimit))) {
            submitClient({ name, email, institution, department, accountType, paid, userLimit, isEditingClient });
        } else if (!name) {
            displayError({ message: 'Please enter a name for the client before saving' });
        } else if (!email || !isEmail(email)) {
            displayError({ message: 'Please enter an email for the client before saving' });
        } else if (!isEditingClient && !accountType ) {
            displayError({ message: 'Please select an account type for the client before saving' });
        } else if (accountType === 'group admin' && !userLimit) {
            displayError({ message: 'Please provide a user limit before saving' });
        }
    };

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

                { !isEditingClient &&
                    <div>
                    <p className="f-body f-body--heavy">Account Type</p>
                        <div className="form__radio-group">
                            <RadioInput
                            updateInput={updateInput}
                            className="form__input"
                            type="radio"
                            name={accountType}
                            radioType='accountType'
                            value="individual lecturer"
                            labelName="individual lecturer"
                            />
                            <RadioInput
                            updateInput={updateInput}
                            className="form__input"
                            type="radio"
                            name={accountType}
                            radioType='accountType'
                            value="group admin"
                            labelName="group admin"
                            />
                            {
                                accountType === 'group admin' &&
                                <Input
                                    updateInput={updateInput}
                                    className="form__input"
                                    type="number"
                                    name="userLimit"
                                    value={userLimit}
                                    labelName="User Limit"
                                />
                            }
                        </div>
                    </div>
                }
                {
                    isEditingClient && accountType === 'group admin' &&
                        <Input
                            updateInput={updateInput}
                            className="form__input"
                            type="number"
                            name="userLimit"
                            value={userLimit}
                            labelName="User Limit"
                        />
                }

                <p className="f-body f-body--heavy">Client Paid</p>
                <div className="form__radio-group">
                    <RadioInput
                      updateInput={updateInput}
                      className="form__input form__radio-individual-input"
                      type="radio"
                      name={paid}
                      radioType='paid'
                      value={true}
                      labelName="Yes"
                    />
                    <RadioInput
                      updateInput={updateInput}
                      className="form__input form__radio-individual-input"
                      type="radio"
                      name={paid}
                      radioType='paid'
                      value={false}
                      labelName="No"
                    />
                </div>

                <div className="error-container f-body--warning">
                    {error && error.message}
                </div>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        handleSubmitClient();
                    }}
                    className="button">
                    Save Client
                </button>

            </form>
        </div>
    );
};


SuperAdminManageClient.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    institution: PropTypes.string,
    department: PropTypes.string,
    accountType: PropTypes.string,
    paid: PropTypes.bool.isRequired,
    userLimit: PropTypes.string,
    code: PropTypes.string,
    updateInput: PropTypes.func.isRequired,
    submitClient: PropTypes.func.isRequired,
    isEditingClient: PropTypes.bool,
    displayError: PropTypes.func.isRequired,
    error: PropTypes.string,
};


export default SuperAdminManageClient;
