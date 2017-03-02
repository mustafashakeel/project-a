import React from 'react';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';

import { isLoggedIn } from '../../../actions'

import Credentials from './Credentials';
import InfoStepper from './InfoStepper';
import BookingMemo from './BookingMemo';


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
          <BookingMemo />
          <button className="bookAppointmentBtn">{t('application.user_info.book_my_appointment')}</button>
        </div>
      }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { isLoggedIn }
)(translate()(PersonalInfoContent))