import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { store } from '../store';
import { clearModuleState } from '../actions/module';
import classnames from 'classnames';


class Dashboard extends Component {

    constructor (props) {
        super(props);
    }

    componentDidMount () {
        store.dispatch(clearModuleState());
    }

    render () {

        let { modules, is_lecturer } = this.props;

        let headerClasses = classnames("level module-header is-mobile", {
            "display-none": modules.length === 0
        });

        let moduleList = modules.map((module, i) => {

            let role = is_lecturer ? 'lecturer' : 'student';

            return (
                <Link key={ i } to={ `${module.module_id}/${role}` } >
                    <li className="box level is-mobile">
                        <div className="level-left">

                            <label className="level-item">
                                { module.name }
                            </label>
                        </div>
                        <div className="level-right">

                            <label className="level-item has-text-centered">
                                <strong>{ module.module_id }</strong>
                            </label>
                        </div>
                    </li>
                </Link>
            );
        });
        return (
            <div className="container dashboard">
                    <h2 className="has-text-centered"> Modules </h2>
                    {
                        is_lecturer &&
                            <Link to="add-new-module">
                                <button className="button is-info">
                                    <span className="icon">
                                        <i className="fa fa-plus" />
                                    </span>
                                    <span>
                                        Add a new module
                                    </span>
                                </button>
                            </Link>
                    }
                    {
                        !is_lecturer &&
                            <Link to="join-module">
                                <button className="button is-info is-medium">
                                    Join a module
                                </button>
                            </Link>
                    }
                    {
                        modules.length === 0 && is_lecturer &&
                            <div className="notification">
                                Create your first module by clicking the button above.
                            </div>
                    }
                    {
                        modules.length === 0 && !is_lecturer &&
                            <div className="notification">
                                Join your first module by clicking the button above.
                            </div>
                    }
                    <div className={ headerClasses }>
                        <div className="level-item">
                            Module name
                        </div>
                        <div className="level-item">
                            Module code
                        </div>
                    </div>
                    <ul>
                        { moduleList }
                    </ul>
            </div>
        );
    }
}


Dashboard.propTypes = {
    modules: PropTypes.array.isRequired,
    is_lecturer: PropTypes.bool.isRequired
};

export default Dashboard;
