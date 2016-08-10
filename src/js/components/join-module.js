import React, { PropTypes } from 'react';

const JoinModule = ({ joining_module_id, handleInputChange }) => {

    return (
        <section className="hero is-primary is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="columns">
                        <div className="box column is-one-third is-offset-one-third">
                            <h2 className="login-title">
                              Join a Module
                            </h2>
                            <label className="label">Module Name</label>
                            <input
                                className="input login-input"
                                value={ joining_module_id || '' }
                                onChange={ (e) => handleInputChange(e.target.value)}
                                type="text"
                                placeholder="Module Name"
                                />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

JoinModule.propTypes = {
    joining_module_id: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired
};

export default JoinModule;
