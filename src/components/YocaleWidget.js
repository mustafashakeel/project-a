import React from 'react';
import { connect } from 'react-redux';

import {appointmentBooked} from '../actions/index';

import BookingForm from './booking_form/BookingForm';
import ThankPage from './thank_page/ThankPage';

function mapStateToProps(state) {
  console.log(state.booking.booked_summary);
  return {
    bookedSummary: state.booking.booked_summary,
    isBooked: state.booking.isBooked
  };
}

export class YocaleWidget extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.bookedSummary.status){
      this.props.appointmentBooked(true);
    }
  }

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
