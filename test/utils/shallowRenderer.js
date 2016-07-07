import React from 'react';
import { createRenderer } from 'react-addons-test-utils';

export default function shallowRenderer (component) {

    let shallowRenderer = createRenderer();
    shallowRenderer.render(component);
    return shallowRenderer.getRenderOutput();
}
