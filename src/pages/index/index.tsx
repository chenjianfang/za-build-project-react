import React from 'react';
import { hot } from 'react-hot-loader/root';
import ReactDOM from 'react-dom';

import App from './app';

let MainApp = App;

if (process.env.NODE_ENV === 'development') {
    MainApp = hot(App);
}

ReactDOM.render(
    <MainApp />,
    document.getElementById('app'),
);
