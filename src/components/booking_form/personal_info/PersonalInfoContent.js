import React from 'react';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';
import axios from 'axios';

import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { isLoggedIn, proccessPayment, bookAppointment } from '../../../actions'

import Credentials from './credentials/Credentials';
import InfoStepper from './info_stepper/InfoStepper';
import AppointmentReminder from './appointment_reminder/AppointmentReminder';
import BookingNote from './info_stepper/booking_note/BookingNote';


import './PersonalInfoContent.scss';

function mapStateToProps(state) {
  return {
    renderLogin: !state.user.isLoggedIn,
    booking: state.booking
  };
}


class PersonalInfoContent extends React.Component {

  bookAppointment(){
    const {booking} = this.props;
    const token = (booking.payment.token)? booking.payment.token.id : "";
    const data = {
      "BookingId": booking.lease.bookingId.toString(),
      "PaymentToken": token,
      "DependentId": booking.dependant.id || "",
      "paymentRequirementInfo": booking.lease.paymentRequirementInfo,
      "ClientLocation": booking.clientLocation,
      "ClientForms": (booking.intake_forms.completed.length)? booking.intake_forms.completed: "",
      "comments": booking.providerMessage,
      "SaveCreditCard": (booking.payment.token === "")? false : true,
      "PaymentCustomerDetailId": booking.payment.paymentCustomerId,
      "ProviderId": booking.provider.providerId
    };

    console.log(data);
    this.props.bookAppointment(data);
  }

  requestAppointment(){
    const {booking} = this.props;
    const data = {
      starDateTime: booking.timestamp.format(),
      providerId: booking.provider.providerId,
      locationId: booking.location.id,
      offeringId: booking.service.offeringId,
      comments: booking.providerMessage,
      clientLocation: booking.lease.clientLocation,
      DependentId: booking.dependant.id || ""
    };
    console.log(data);
    this.props.bookAppointment(data, true);
  }
  render() {
    const {t, booking} = this.props;
    return (
      <div>
        <div className="PersonalInfoContent">      
        {this.props.renderLogin ?
          <Credentials/>
          :
          <div>
            <InfoStepper />
            <BookingNote />

          </div>        
        }        
        </div>

      {!this.props.renderLogin &&
        <div className="bookingButton">
        {booking.allowConfirmedBooking ?
          <button 
            className="bookAppointmentBtn"
            onClick={this.bookAppointment.bind(this)}
            >
            {t('application.user_info.book_my_appointment')}
          </button> 
        :
          <button 
            className="bookAppointmentBtn"
            onClick={this.requestAppointment.bind(this)}
            >
            Request appointment
          </button>
        }
        </div>
      }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { isLoggedIn, proccessPayment, bookAppointment }
)(translate()(PersonalInfoContent))