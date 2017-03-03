import React from 'react';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';

import { isLoggedIn, appointmentBooked } from '../../../actions'

import Credentials from './credentials/Credentials';
import InfoStepper from './info_stepper/InfoStepper';
import AppointmentReminder from './appointment_reminder/AppointmentReminder';


import './PersonalInfoContent.scss';

function mapStateToProps(state) {
  return {
    renderLogin: !state.user.isLoggedIn
  };
}


class PersonalInfoContent extends React.Component {

  hideCredentials = () => {
    this.props.isLoggedIn(true);
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
            onClick={this.props.appointmentBooked.bind(this,true)}
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