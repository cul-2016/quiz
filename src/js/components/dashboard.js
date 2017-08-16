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

        let { modules, is_lecturer, module_id, handleInputChange, handleJoinModule } = this.props;


        let moduleList = modules.map((module, i) => {

            let role = is_lecturer ? 'lecturer' : 'student';

            return (
                <div key={ i } className="card">
                    <Link to={ `${module.module_id}/${role}` } >
                        <div className="module__name f-body">
                            { module.name }
                        </div>
                        <div className="module__id f-body f-body--primary">
                            { module.module_id }
                        </div>
                    </Link>
                </div>
            );
        });
        return (
            <div className="container dashboard">
              <div className="content__body">
                <h2 className="f-display"> Modules </h2>
                {
                  is_lecturer &&
                  <div className="dashboard__lecturer">
                    <Link to="add-new-module">
                      <button className="button button__dark">
                        <span className="icon">
                          <i className="fa fa-plus" />
                        </span>
                        <span>
                          New Module
                        </span>
                      </button>
                    </Link>
                  </div>
                }
                {
                  !is_lecturer &&
                  <div className="card card__secondary">
                    <input
                      className="form__input form__input--add-module"
                      value={ module_id || '' }
                      maxLength="4"
                      onChange={ (e) => handleInputChange(e.target.value)}
                      type="text"
                      placeholder="CODE"/>
                    <button
                      className="button button__secondary"
                      onClick={ () => handleJoinModule() }>
                      Add A Module
                    </button>
                  </div>
                }
                <div className="line"></div>

                  <div className="module__header" >
                      <div className="module__header__name f-label f-label--dark">
                          Name
                      </div>
                      <div className="module__header__id f-label f-label--dark">
                          Code
                      </div>
                  </div>
                <div>
                  { moduleList }
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
    module_id: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleJoinModule: PropTypes.func.isRequired
};

export default Dashboard;
