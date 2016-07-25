import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Dashboard = ({ modules }) => {

    let lecturerModules = modules.map((module, i) => {
        return (
            <Link to={ 'module/' + module.module_id } >
                <div key={ i }>
                    { `${module.module_id} ${module.name}` }
                </div>
            </Link>
        );
    });

    return (
        <div>
            <h1>Welcome, lecturer</h1>
            <Link to="new-module">
                <button>
                    Add a new module
                </button>
            </Link>
            <div>
                { lecturerModules }
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    modules: PropTypes.array.isRequired
};

export default Dashboard;
