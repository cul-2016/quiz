import test from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import Root from '../../src/js/root';
import { store } from '../../src/js/store';

test('If no cookie present, redirects to login', (t) => {

    t.plan(1);
    document.cookie = 'fakecookie';
    const app = renderIntoDocument(<div><Root store={ store } /></div>);
    const result = ReactDOM.findDOMNode(app).querySelector('h3').textContent;
    t.equal(result, 'Login', 'Redirects to login page');
});
