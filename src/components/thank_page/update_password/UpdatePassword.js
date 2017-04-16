import React from 'react';
import { connect } from 'react-redux';

import { updateUserPassword } from '../../../actions/index';
import TextField from 'react-md/lib/TextFields';

function mapStateToProps(state) {
  return {
    user: state.user,
    booking: state.booking
  };
}

export class UpdatePassword extends React.Component {

  state = {
    password: ''
  }

  onChangePassword(password){
    this.setState({
      password
    })      
  }

  render() {
    const {booking} = this.props;
    return (
      <div>
        {booking.allowConfirmedBooking ?
          <h4>Your booking is confirmed</h4>
          :
          <h4>Appointment has been requested, you will receive an email when Provider Name has confirmed this appointment.</h4>
        }
        <h4>We have created an account for you<br/>Set a password</h4>
        <TextField 
          id="credentialsEmail"
          placeholder="New password *"
          onChange={this.onChangePassword.bind(this)} 
          value={this.state.password}
          />

            <button 
              className="yocaleButton"
              onClick={this.props.updateUserPassword.bind(this, this.state.password)}
            >Create password</button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { updateUserPassword }
)(UpdatePassword)
