import React from 'react';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';
import axios from 'axios';

import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { isLoggedIn, proccessPayment } from '../../../actions'

import Credentials from './credentials/Credentials';
import InfoStepper from './info_stepper/InfoStepper';
import AppointmentReminder from './appointment_reminder/AppointmentReminder';
import BookingNote from './info_stepper/booking_note/BookingNote';

import './PersonalInfoContent.scss';

function mapStateToProps(state) {
  return {
    renderLogin: !state.user.isLoggedIn,
    booking: state.booking,
    user: state.user
  };
}


class PersonalInfoContent extends React.Component {

  bookAppointment(){
    const {booking, user} = this.props;
    const paymentDetails = {
      email: user.credentials.email,
      source: booking.payment.id,
      amount: (booking.grantTotal * 100),
      description: booking.service.name
    };

    this.props.proccessPayment(booking.lease.id, paymentDetails);
  }
  render() {
    const {t} = this.props;
    return (
      <div className="PersonalInfoContent">
      {this.props.renderLogin ?
        <Credentials/>
        :
        <div>
          <InfoStepper />
          <BookingNote />
          <button 
            className="bookAppointmentBtn"
            onClick={this.bookAppointment.bind(this)}
            >
            {t('application.user_info.book_my_appointment')}
          </button>
        </div>
      }
        
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { isLoggedIn, proccessPayment }
)(translate()(PersonalInfoContent))