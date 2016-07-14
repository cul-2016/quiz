import test from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import Dashboard from '../../../src/js/components/lecturer/dashboard';
import { dashboardData as data } from '../../utils/data-fixtures';


test.only('LecturerDashboard renders correctly', (t) => {

    t.plan(2);

    const node = renderIntoDocument(<div><Dashboard modules={ data } /></div>);
    const expectedHeader = ReactDOM.findDOMNode(node).querySelector('h1').textContent;
    const expectedButton = ReactDOM.findDOMNode(node).querySelector('button').textContent;

    t.equal(expectedHeader, 'Welcome, lecturer');
    t.equal(expectedButton, 'Add a new module');
});
