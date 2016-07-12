import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, hashHistory, Link } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/app';
import Login from './components/login';
import LecturerDashboardContainer from './containers/lecturer-dashboard-container';
import StudentDashboardContainer from './containers/student-dashboard-container';

import authenticate from './lib/authenticate';


const Authd = () => {
    return (
        <div>
            We are authenticated
            <nav>
                <Link to="/dashboard-student">Students</Link><br/>
                <Link to="/dashboard-lecturer">Lecturer</Link>
            </nav>
        </div>
    );
};

const Root = ({ store }) => (

    <Provider store={ store }>
        <Router history={ hashHistory }>
            <Route path="/" component={ App }>
                <IndexRoute component={ Login } />
                <Route onEnter={ authenticate }  path="auth" component={ Authd } />
                <Route onEnter={ authenticate }  path="dashboard-lecturer" component={ LecturerDashboardContainer } />
                <Route onEnter={ authenticate }  path="dashboard-student" component={ StudentDashboardContainer } />
            </Route>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;
