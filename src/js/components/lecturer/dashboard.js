import React, { PropTypes } from 'react';

const Dashboard = ({ modules }) => {

    let lecturerModules = modules.map((module, i) => {
        return (
            <div key={ i }>
                { `${module.module_id} ${module.name}` }
            </div>
        );
    });

    return (
        <div>
            <h1>Welcome, lecturer</h1>
            <div>
                Add a new module
            </div>
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
