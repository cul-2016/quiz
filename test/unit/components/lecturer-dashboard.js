import test from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import Dashboard from '../../../src/js/components/lecturer/dashboard';

test('LecturerDashboard renders correctly', (t) => {

    const modules = [
        {
            code: 'MOD1',
            name: 'Psychology 101'
        },
        {
            code: 'MOD2',
            name: 'Psychology 101'
        }
    ];

    const node = renderIntoDocument(<div><Dashboard modules={ modules } /></div>);
    const result = ReactDOM.findDOMNode(node).querySelector('h1').textContent;
    t.equal(result, 'Welcome, lecturer');
    t.end();
});
