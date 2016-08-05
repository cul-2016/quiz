import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Dashboard = ({ modules }) => {

    let lecturerModules = modules.map((module, i) => {
        return (
            <div className="column is-8 is-offset-2" key={ i }>
                <Link  to={ 'module/' + module.module_id } >
                    <div key={ i }>
                        { `${module.module_id} ${module.name}` }
                    </div>
                </Link>
            </div>
        );
    });

    return (
        <div>
            <nav className="nav">
                <div className="nav-left">
                    <p className="nav-item is-brand">
                    <strong>Welcome,</strong> lecturer
                    </p>
                </div>
                <div className="nav-right nav-menu">
                    <p className="nav-item" >
                    Logout
                    </p>
                </div>
            </nav>
            
            <div className="columns">
                <div className="column is-4 is-offset-8">
                    <Link to="new-module">
                        <button className="button is-primary">
                            Add a new module
                        </button>
                    </Link>
                </div>
            </div>
            <div className="box columns">
                { lecturerModules }
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    modules: PropTypes.array.isRequired
};

export default Dashboard;
