import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Nav from './general/nav';

const Dashboard = ({ modules, username, is_lecturer }) => {
    let lecturerModules = modules.map((module, i) => {

        let role = is_lecturer ? 'lecturer' : 'student';

        return (
            <div className="box column is-8 is-offset-2 module-list-item" key={ i }>
                <Link  to={ `${module.module_id}/${role}` } >
                    <div key={ i }>
                        { `${module.module_id}: ${module.name}` }
                    </div>
                </Link>
            </div>
        );
    });
    return (
        <div className='dashboard'>
            <Nav username={ username } />

            <div className="column is-2 is-offset-8">
                <Link to="new-module">
                    <button className="button is-primary">
                        Add a new module
                    </button>
                </Link>
            </div>

            <div>
                { lecturerModules }
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    modules: PropTypes.array.isRequired,
    username: PropTypes.string,
    is_lecturer: PropTypes.bool.isRequired
};

export default Dashboard;
