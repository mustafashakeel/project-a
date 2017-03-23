import React from 'react';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';
import axios from 'axios';

import { isLoggedIn, appointmentBooked, getIntakeForms } from '../../../actions'

import Credentials from './credentials/Credentials';
import InfoStepper from './info_stepper/InfoStepper';
import AppointmentReminder from './appointment_reminder/AppointmentReminder';

import Snackbar from 'react-md/lib/Snackbars';

import './PersonalInfoContent.scss';

function mapStateToProps(state) {
  return {
    renderLogin: !state.user.isLoggedIn,
    booking: state.booking,
    user: state.user
  };
}


class PersonalInfoContent extends React.Component {

  state = {
    toasts: [],
    autohide: false
  }

  removeToast() {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  }

  addToast(text, action) {
    const toasts = this.state.toasts.slice();
    toasts.push({ text, action });

    this.setState({ toasts });
  }

  bookAppointment(){
    const {booking, user} = this.props;
    const self = this;
    axios.post('http://express-stripe.herokuapp.com/charge',{
      email: user.credentials.email,
      source: booking.payment.id,
      amount: (booking.grantTotal * 100),
      description: booking.service.name
    }).then((response)=>{
      // console.log(response);
      if(response.data.paid === true && response.data.status === "succeeded") {
        self.props.appointmentBooked(true);
      }else{
        self.addToast(response.data.message, "Retry")
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    // user is logged in and booking was leased
    if(nextProps.booking.lease !== null && this.props.renderLogin){
      this.props.isLoggedIn(true);
      this.props.getIntakeForms(nextProps.booking.lease.id);
    }
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
          <AppointmentReminder />
          <button 
            className="bookAppointmentBtn"
            onClick={this.bookAppointment.bind(this)}
            >
            {t('application.user_info.book_my_appointment')}
          </button>
        </div>
      }
        <Snackbar {...this.state} onDismiss={this.removeToast.bind(this)} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { isLoggedIn, appointmentBooked, getIntakeForms }
)(translate()(PersonalInfoContent))