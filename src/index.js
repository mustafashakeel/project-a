import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { I18nextProvider } from 'react-i18next';

import promise from 'redux-promise';
import i18n from './i18n'; // initialized i18next instance


import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

import BookingForm from './components/booking_form/BookingForm';
import widgetSettings from './widgetSettings';
import './index.scss';


const settings = {
  position: 'right',
  businessID: "123456789"
};

// i18n.changeLanguage("es");

widgetSettings.setValue(settings);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <I18nextProvider i18n={ i18n }><BookingForm /></I18nextProvider>
  </Provider>
  , document.getElementById('yocale-booking-widget'));
