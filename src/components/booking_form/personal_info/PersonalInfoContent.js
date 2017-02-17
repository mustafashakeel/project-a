import React from 'react';
import Dialog from 'react-md/lib/Dialogs'

import Credentials from './Credentials'

import './PersonalInfoContent.scss';

export default class PersonalInfoContent extends React.Component {
  state = {
    showLogin: true
  }

  hideCredentials = () => {
    // let newUserStatus = this.state.userStatus;
    // newUserStatus.showLogin = false;
    // this.setState({userStatus: newUserStatus});
  }

  closeDialog = () => {

  }

  render() {
    return (
      <div>
      {this.state.showLogin &&
        <Credentials 
          hideCredentials={this.hideCredentials}/>
      }
                

      </div>
    );
  }
}
