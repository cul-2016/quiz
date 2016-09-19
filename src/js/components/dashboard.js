import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { store } from '../store';
import { clearModuleState } from '../actions/module';


class Dashboard extends React.Component {

    constructor (props) {
        super(props);
    }

    componentDidMount () {
        store.dispatch(clearModuleState());
    }

    render () {
        let moduleList = this.props.modules.map((module, i) => {

            let role = this.props.is_lecturer ? 'lecturer' : 'student';

            return (
                <div className="dashboard" key={ i }>
                    <Link  to={ `${module.module_id}/${role}` } >
                        <div className="module box">
                            <div className="">
                                <p>{module.module_id}</p>
                            </div>
                            <div className="">
                                <p>{module.name}</p>
                            </div>
                            <div className="">
                                <i className="fa fa-archive" />
                            </div>
                        </div>
                    </Link>
                </div>
            );
        });
        return (
            <div className='dashboard'>
                <div className="container">
                    <h2 className="has-text-centered"> Modules </h2>
                    {
                        this.props.is_lecturer &&
                            <Link className="column is-2 is-offset-9" to="add-new-module">
                                <button className="button is-primary">
                                    Add a new module
                                </button>
                            </Link>
                    }
                    {
                        !this.props.is_lecturer &&
                            <Link className="column is-2 is-offset-8" to="join-module">
                                <button className="button is-primary is-medium">
                                    Join a module
                                </button>
                            </Link>
                    }
                    { moduleList }

                </div>
            </div>
        );
    }
}


Dashboard.propTypes = {
    modules: PropTypes.array.isRequired,
    is_lecturer: PropTypes.bool.isRequired
};

export default Dashboard;
