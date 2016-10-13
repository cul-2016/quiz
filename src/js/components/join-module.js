import React, { PropTypes } from 'react';
import classnames from 'classnames';

const JoinModule = ({ module_id, moduleIDExists, handleInputChange, handleJoinModule }) => {

    let joinModuleClass = classnames("button is-warning login-button", {
        "is-disabled": module_id && !moduleIDExists && module_id.length !== 4
    });

    let inputClass = classnames("input login-input", {
        "is-success": moduleIDExists && module_id && module_id.length === 4,
        "is-danger": moduleIDExists === false && module_id && module_id.length === 4
    });

    return (
        <section className="hero is-primary is-fullheight join-module">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="columns">
                        <div className="box column is-one-third is-offset-one-third">
                            <h2 className="login-title">
                              Join a Module
                            </h2>
                            <label className="label">Module Name</label>
                            <h6 className="">Please enter the module code your lecturer gave you.</h6>
                            <input
                                className={ inputClass }
                                value={ module_id || '' }
                                onChange={ (e) => handleInputChange(e.target.value)}
                                type="text"
                                placeholder="Code"
                                />
                            <div>
                                <a className={ joinModuleClass } onClick={ () => handleJoinModule() }>
                                    Join Module
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

JoinModule.propTypes = {
    module_id: PropTypes.string,
    moduleIDExists: PropTypes.bool,
    handleInputChange: PropTypes.func.isRequired,
    handleJoinModule: PropTypes.func.isRequired
};

export default JoinModule;
