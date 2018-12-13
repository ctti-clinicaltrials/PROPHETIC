import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './registerServiceWorker';
import App from "./App";
require('./util/polyfills.js');

ReactDOM.render((<App />), document.getElementById('root'));

unregister();