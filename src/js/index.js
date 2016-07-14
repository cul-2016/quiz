import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import { store } from './store';
require('../scss/main.scss');

ReactDOM.render(
    <Root store={ store }/>,
    document.getElementsByClassName('content')[0]
);
