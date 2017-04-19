import React from 'react';
import { connect } from 'react-redux';

import {appointmentBooked} from '../actions/index';

import BookingForm from './booking_form/BookingForm';
import ThankPage from './thank_page/ThankPage';
import ErrorMessage from './common/error_message/ErrorMessage';
import YocaleLoader from './common/yocale_loader/YocaleLoader';



function mapStateToProps(state) {
  return {
    bookedSummary: state.booking.booked_summary,
    isBooked: state.booking.isBooked
  };
}

export class YocaleWidget extends React.Component {



  render() {
    return (
      <div>  
        <YocaleLoader/>
        {!this.props.isBooked ?
          <BookingForm/>
          :
          <ThankPage />
        }
        <ErrorMessage />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {appointmentBooked}
)(YocaleWidget)
