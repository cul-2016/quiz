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
                <div key={ i } className="card">
                    <Link to={ `${module.module_id}/${role}` } >
                        <div className="body">
                            { module.name }
                        </div>
                        <div className="body body__primary">
                            { module.module_id }
                        </div>
                    </Link>
                </div>
            );
        });
        return (
            <div className="container dashboard">

                <button className="button button__tertiary button__tertiary--large button__icon--right">
                    Trophy Cabinet
                    <span className="fa-chevron-right"></span>
                </button>
                    <h2 className="display"> Modules </h2>
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
                            <div className="card card__secondary">
                                <input className="form__input" placeholder="CODE"></input>
                                <button className="button button__secondary">Add A Module</button>
                            </div>
                    }
                    <div className="line"></div>
                    <div>
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
