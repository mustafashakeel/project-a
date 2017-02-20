import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { fetchUser } from '../../../actions/index';

import isEmail from 'validator/lib/isEmail';

import Button from 'react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields';

import './Credentials.scss'; 

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

class Credentials extends React.Component {

  state = {
    isValidEmail : false
  }

  getPasswordLabel = () => {
    return (this.props.user.isUser)? "Enter your password *" : "Create a password *";

  }  

  onChangeEmail = (email) => {
    this.props.fetchUser(email);
    this.setState({
      isValidEmail: isEmail(email)
    })
  }

  showPasswordField = () => {
    return this.state.isValidEmail || this.props.user.isUser;
  }

  showLabelContinueBtn = () => {
    return (this.props.user.isUser)? 'Continue' : 'Continue as Guest'
  }


  render() {
    return (
      <div className="credentials">
        <h2>Complete your contact info to confirm your booking!</h2>
        <div className="innerCredentials">
          <TextField 
            id="credentialsEmail" 
            placeholder="Email *" 
            onChange={this.onChangeEmail.bind(this)} 
            value={this.props.user.credentials.email}/>

            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
              component='div'>
              {this.showPasswordField() &&
                <div>
                  <TextField 
                    id="credentialsPassword" 
                    type="password" 
                    placeholder={this.getPasswordLabel()} />

                  {!this.props.user.isUser &&
                    <button 
                      className="yocaleButton"
                      onClick={this.props.hideCredentials}
                    >Create Account</button>
                  }

                  <button 
                    className="yocaleButton"
                    onClick={this.props.hideCredentials}
                  >{this.showLabelContinueBtn()}</button>
                </div>
              }
            </ReactCSSTransitionGroup>


        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { fetchUser }
)(Credentials)