import React from 'react';
import { connect } from 'react-redux';

import { updateUserPassword } from '../../../actions/index';
import TextField from 'react-md/lib/TextFields';

import './UpdatePassword.scss';

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
      <div className="UpdatePassword">
        <div className="container">
          <p>Set a password if you would like to:</p>
          <ol>
            <li>Modify/cancel this appointment in future</li>
            <li>Keep track of your invoices online for this booking</li>
            <li>Book your future appointments faster!</li>
          </ol>

          <TextField 
            id="credentialsEmail"
            placeholder="New password *"
            type="password"
            onChange={this.onChangePassword.bind(this)} 
            value={this.state.password}
            />
            <div className="inlineButtons">
              <button 
                className="yocaleButton"
                onClick={this.props.updateUserPassword.bind(this, this.state.password)}
              >Create password</button>
              <button 
                className="yocaleButton skipButton"
                onClick={this.props.onSkip}
              >Skip</button>
            </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { updateUserPassword }
)(UpdatePassword)
