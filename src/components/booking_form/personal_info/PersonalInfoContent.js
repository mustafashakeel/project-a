import React from 'react';
import {translate} from 'react-i18next';

import Credentials from './Credentials';
import InfoStepper from './InfoStepper';
import BookingMemo from './BookingMemo';


import './PersonalInfoContent.scss';

class PersonalInfoContent extends React.Component {
  state = {
    showLogin: false
  }

  hideCredentials = () => {
    this.setState({showLogin: false});
  }

  render() {
    const {t} = this.props;
    return (
      <div className="PersonalInfoContent">
      {this.state.showLogin ?
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

export default translate()(PersonalInfoContent)