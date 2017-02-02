import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory} from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();


import App from './App.js';
import routes from './routes';

ReactDOM.render(
  <Router history={browserHistory} routes={routes}/>
  , document.getElementById('root'));


