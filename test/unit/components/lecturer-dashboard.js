import test from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import Dashboard from '../../../src/js/components/lecturer/dashboard';
import { dashboardData as data } from '../actions/action-fixtures';


test('LecturerDashboard renders correctly', (t) => {

    const node = renderIntoDocument(<div><Dashboard modules={ data } /></div>);
    const result = ReactDOM.findDOMNode(node).querySelector('h1').textContent;
    t.equal(result, 'Welcome, lecturer');
    t.end();
});
