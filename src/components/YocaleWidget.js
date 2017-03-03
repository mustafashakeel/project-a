import React from 'react';
import { connect } from 'react-redux';

import {appointmentBooked} from '../actions/index';

import BookingForm from './booking_form/BookingForm';
import ThankPage from './thank_page/ThankPage';

function mapStateToProps(state) {
  return {
    isBooked: state.booking.isBooked
  };
}

export class YocaleWidget extends React.Component {

  render() {
    return (
      <div>
        {!this.props.isBooked ?
          <BookingForm/>
          :
          <ThankPage />
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {appointmentBooked}
)(YocaleWidget)
