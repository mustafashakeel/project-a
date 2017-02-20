import React from 'react';
import Dialog from 'react-md/lib/Dialogs';

import Credentials from './Credentials';
import InfoStepper from './InfoStepper';
import BookingMemo from './BookingMemo';


import './PersonalInfoContent.scss';

export default class PersonalInfoContent extends React.Component {
  state = {
    showLogin: true
  }

  hideCredentials = () => {
    this.setState({showLogin: false});
  }

  render() {
    return (
      <div className="PersonalInfoContent">
      {this.state.showLogin ?
        <Credentials hideCredentials={this.hideCredentials}/>
        :
        <div>
          <InfoStepper />
          <BookingMemo />
          <button className="bookAppointmentBtn">Book my appointment</button>
        </div>
      }
      </div>
    );
  }
}
