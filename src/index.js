import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { I18nextProvider } from 'react-i18next';

import promise from 'redux-promise';
import thunk from 'redux-thunk' 
import i18n from './i18n/i18n'; // initialized i18next instance

import reducers from './reducers';

import YocaleWidget from './components/YocaleWidget';
import widgetSettings from './widgetSettings';
import { getURLParameter }  from './utils';

import './index.scss';

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

const settings = {
  position: 'right',
  // businessID: getURLParameter('businessID')
  businessID: 3654
};

if (getURLParameter('lang') !== null){
  i18n.changeLanguage(getURLParameter('lang'));
}

widgetSettings.setValue(settings);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <I18nextProvider i18n={ i18n }><YocaleWidget /></I18nextProvider>
  </Provider>
  , document.getElementById('yocale-booking-widget'));
