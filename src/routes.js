import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import BookingButton from './components/booking_button/BookingButton';
import BookingForm from './components/booking_form/BookingForm';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={BookingButton}/>
    <Route path="form" component={BookingForm} />
  </Route>
)

