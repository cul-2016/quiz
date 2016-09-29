import test from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import Dashboard from '../../../src/js/components/dashboard';
import { dashboardData as data } from '../../utils/data-fixtures';


test('Dashboard renders correctly', (t) => {

    t.plan(1);

    const node = renderIntoDocument(<div><Dashboard modules={ data } /></div>);
    const expected = ReactDOM.findDOMNode(node).querySelector('.dashboard');

    t.ok(expected);
});

//could add a test for clicking add module button
