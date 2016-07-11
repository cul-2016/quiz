import test from 'tape';
import React from 'react';
import TestUtils, { renderIntoDocument } from 'react-addons-test-utils';
import shallowRenderer from '../utils/shallowRenderer';
import Root from '../../src/js/root';
import { store } from '../../src/js/store';

test.skip('If no cookie present, redirects to login', (t) => {

    // t.plan(1);
    document.cookie = 'fakecookie';
    const app = renderIntoDocument(<Root store={ store } />);
    console.log("APP", app);
    t.end();
    // const result = TestUtils.findRenderedDOMComponentWithTag(app, 'h3');
    // t.equal(result, 'Login');
});
