import React from 'react';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';
import axios from 'axios';

import { isLoggedIn, appointmentBooked } from '../../../actions'

import Credentials from './credentials/Credentials';
import InfoStepper from './info_stepper/InfoStepper';
import AppointmentReminder from './appointment_reminder/AppointmentReminder';

import './PersonalInfoContent.scss';

function mapStateToProps(state) {
  return {
    renderLogin: !state.user.isLoggedIn,
    booking: state.booking,
    user: state.user
  };
}


class PersonalInfoContent extends React.Component {

  hideCredentials = () => {
    this.props.isLoggedIn(true);
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
      if(response.data.paid === true) {
        self.props.appointmentBooked(true);
      }
    })
  }


  render() {
    const {t} = this.props;
    return (
      <div className="PersonalInfoContent">
      {this.props.renderLogin ?
        <Credentials hideCredentials={this.hideCredentials}/>
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
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { isLoggedIn, appointmentBooked }
)(translate()(PersonalInfoContent))