import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root.js';
import { store } from './store';

require('babel-polyfill');
require('es6-promise').polyfill();
require('../scss/main.scss');
// require('../scss/font-awesome/main.scss');

ReactDOM.render(
    <Root store={ store }/>,
    document.getElementsByClassName('content')[0]
);
