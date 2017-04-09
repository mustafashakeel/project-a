import React from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../../../actions/index';

import validator from 'validator';

import TextField from 'react-md/lib/TextFields';
// import FadeInOut from '../../common/fade_in_out/FadeInOut';


function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export class ConfirmationEmail extends React.Component {

  state = {
    isValidEmail: false,
  }

  createNewUser(){
    console.log("Create user from guest");
    console.log(this.props.user.credentials);
  }

  onChangeEmail(email){
    this.props.fetchUser(email);
    this.setState({
      isValidEmail: validator.isEmail(email)
    })      
  }

  render() {
    return (
      <div>
        <h4>Your booking is confirmed!</h4>
        <h4>Receive confirmation by email:</h4>
        <TextField 
          id="credentialsEmail"
          placeholder="Email *"
          onChange={this.onChangeEmail.bind(this)} 
          value={this.props.user.credentials.email}
          />

            <button 
              className="yocaleButton"
              onClick={this.createNewUser.bind(this)}
            >Send confirmation</button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { fetchUser }
)(ConfirmationEmail)
