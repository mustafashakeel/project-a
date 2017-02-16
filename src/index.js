import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, browserHistory} from 'react-router';


import widgetSettings from './widgetSettings';

import './index.scss';

// import App from './App.js';
// import routes from './routes';
import BookingForm from './components/booking_form/BookingForm';


const settings = {
  position: 'right',
  businessID: "123456789"
};

widgetSettings.setValue(settings);

ReactDOM.render(
  <BookingForm />
  , document.getElementById('yocale-booking-widget'));

// export const init = (settings) => {
//   console.log(settings);
// ReactDOM.render(
//   <Router history={browserHistory} routes={routes}/>
//   , document.getElementById('yocale-booking-widget'));
// }

