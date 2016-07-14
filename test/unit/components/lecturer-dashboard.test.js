import test from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import Dashboard from '../../../src/js/components/lecturer/dashboard';
import { dashboardData as data } from '../../utils/data-fixtures';


test('LecturerDashboard renders correctly', (t) => {

    t.plan(1);

    const node = renderIntoDocument(<div><Dashboard modules={ data } /></div>);
    const result = ReactDOM.findDOMNode(node).querySelector('h1').textContent;
    t.equal(result, 'Welcome, lecturer');
});
