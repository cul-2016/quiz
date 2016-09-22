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
                        this.props.is_lecturer &&
                            <Link to="add-new-module">
                                <button className="button is-primary">
                                    Add a new module
                                </button>
                            </Link>
                    }
                    {
                        !this.props.is_lecturer &&
                            <Link to="join-module">
                                <button className="button is-primary is-medium">
                                    Join a module
                                </button>
                            </Link>
                    }
                    <div className="level module-header is-mobile">
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
