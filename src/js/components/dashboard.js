import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { store } from '../store';
import { clearModuleState } from '../actions/module';
import Nav from './general/nav';

class Dashboard extends React.Component {

    constructor (props) {
        super(props);
    }

    componentDidMount () {
        store.dispatch(clearModuleState());
    }

    render () {
        let lecturerModules = this.props.modules.map((module, i) => {

            let role = this.props.is_lecturer ? 'lecturer' : 'student';

            return (
                <div className="column is-8 is-offset-2 dashboard" key={ i }>
                    <Link  to={ `${module.module_id}/${role}` } >
                    <div className="columns module">
                        <div className="column is-3">
                            <p>{module.module_id}</p>
                        </div>
                        <div className="column is-7">
                            <p>{module.name}</p>
                        </div>
                        <div className="column is-1">
                            <i className="fa fa-archive" />
                        </div>

                    </div>
                    </Link>
                </div>
            );
        });
        return (
            <div className='dashboard'>
                <Nav username={ this.props.username } />
                <h2 className="has-text-centered"> Modules </h2>
                <a href="whatsapp://send?text=The text to share!" data-action="share/whatsapp/share">Share via Whatsapp</a>
                <a href="fb://friends" >Share via facebook</a>
                <a href="sms:&body=this is sohil!">Share via messages</a>
                <a href="sms:?body=THIS IS MINA">android</a>
                <div className="container">
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
                    <div className="column is-8 is-offset-2">
                        <div className="columns module-header">
                            <div className="column is-3">
                                <label className="label">ID</label>
                            </div>
                            <div className="column is-7">
                                <label className="label">Name</label>
                            </div>
                            <div className="column is-1">
                            </div>
                        </div>
                    </div>
                    <div>
                        { lecturerModules }
                    </div>
                </div>
            </div>
        );
    }
}


Dashboard.propTypes = {
    modules: PropTypes.array.isRequired,
    username: PropTypes.string,
    is_lecturer: PropTypes.bool.isRequired
};

export default Dashboard;
