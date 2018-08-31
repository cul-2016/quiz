import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { store } from '../store';
import { clearModuleState } from '../actions/module';


class Dashboard extends Component {

    constructor (props) {
        super(props);
    }

    componentDidMount () {
        store.dispatch(clearModuleState());
    }

    render () {

        let { modules, is_lecturer, module_id, handleInputChange, handleJoinModule, joinModuleError } = this.props;

        let moduleList = modules.map((module, i) => {

            let role = is_lecturer ? 'lecturer' : 'student';

            return (
                <Link key={ i } to={ `${module.module_id}/${role}` } >
                    <div className="card">
                            <div className="module__name f-body">
                                { module.name }
                            </div>
                            <div className="module__id f-body f-body--primary f-body--heavy">
                                { module.module_id }
                            </div>
                    </div>
                </Link>
            );
        });
        return (
            <div className="container dashboard">
              <div className="content__body">
                <div className="dashboard__lecturer">
                    <div className="dashboard__lecturer--title">
                        <h2 className="f-headline f-headline--primary"> Modules </h2>
                    </div>
                    {
                        is_lecturer &&
                            <div className="dashboard__lecturer--icon">
                                <Link to="add-new-module">
                                    <button className="button button__icon">
                                        <span className="icon">
                                            <i className="fa fa-plus fa-2x" />
                                        </span>
                                    </button>
                                </Link>
                            </div>
                    }
                </div>
                {
                  !is_lecturer &&
                  <div id="ga-student-module" className="card">
                  <div className="dashboard__student--module">
                      <input
                          className="form__input form__input--add-module"
                          value={ module_id || '' }
                          maxLength="4"
                          onChange={ (e) => handleInputChange(e.target.value)}
                          type="text"
                          placeholder="CODE"/>
                      <button
                          className="button"
                          onClick={ () => handleJoinModule() }>
                          Add A Module
                      </button>
                      {
                          joinModuleError &&
                          <p className="module__err-message">No module found<br />  with this code</p>
                      }
                  </div>
                  </div>
                }
                <div className="line"></div>
                <div>
                  { moduleList }
                </div>
                <div className="dashboard__lecturer">
                  <div className="dashboard__lecturer--title">
                    <a href={`${process.env.STUDY_PLANNER_URL}`}>
                      <h2 className="f-headline f-headline--primary forum__link"> Study Planner </h2>
                    </a>
                  </div>
                  <div className="dashboard__lecturer--title">
                    <a href={`${process.env.FORUM_URL}`}>
                      <h2 className="f-headline f-headline--primary forum__link"> Forum </h2>
                    </a>
                  </div>
                </div>
                <div className="f-body dashboard__tc" >
                    View <Link className="f-body f-body--primary" target="_blank" to="/privacy">privacy statement</Link>
                </div>
              </div>
            </div>
        );
    }
}


Dashboard.propTypes = {
    modules: PropTypes.array.isRequired,
    is_lecturer: PropTypes.bool.isRequired,
    module_id: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    handleJoinModule: PropTypes.func.isRequired,
    joinModuleError: PropTypes.string
};

export default Dashboard;
