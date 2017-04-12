import React from 'react';
import _ from 'underscore';

import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { loginAsGuest, signupUser, userExists, loginUser } from '../../../../actions/index';

import validator from 'validator';
import { checkFields } from '../../../../utils';
import FacebookLogin from 'react-facebook-login';
import ForgotPassword from './forgot_password/ForgotPassword';

import TextField from 'react-md/lib/TextFields';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import FadeInOut from '../../../common/fade_in_out/FadeInOut';

import './Credentials.scss'; 

const facebookAppId = '1270547073052193';
let timer = null;

function mapStateToProps(state) {
  return {
    user: state.user,
    booking: state.booking
  };
}

class Credentials extends React.Component {

  constructor(props) {
    super(props);
    const {t} = this.props;
    this.state = {
      isValidEmail : false,
      creatingNewAccount: false,
      fields: {
        email:{
          required: true,
          error: false,
          errorText: t('application.user_info.login_fields.email.error'),
          value: ''
        },
        firstName: {
          required: true,
          error: false,
          errorText: t('application.user_info.login_fields.firstName.error'),
          value: ''
        },
        lastName: {
          required: true,
          error: false,
          errorText: t('application.user_info.login_fields.lastName.error'),
          value: ''
        },
        password:{
          required: true,
          error: false,
          errorText: t('application.user_info.login_fields.password.error'),
          value: ''
        },
        phoneNumber: {
          required: false,
          error: false,
          errorText: t('application.user_info.login_fields.phoneNumber.error'),
          value: ''
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const fields = this.state.fields;
    fields.email.value = nextProps.user.credentials.email;
    this.setState({fields});

    if (this.state.creatingNewAccount && nextProps.user.isUser){
      this.setState({
        creatingNewAccount: !nextProps.user.isUser
      });
    }
  }

  typewatch(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  }

  emailExist(){
    const email = this.state.fields.email.value;
    const isValidEmail = validator.isEmail(email)
    // this.setState({
    //   isValidEmail: isValidEmail
    // });
    if (isValidEmail) {      
      this.props.userExists(email);
    }
  }

  onChangeFields(key, value) {
    var state = this.state.fields;
    state[key].value = value;
    this.setState({ fields: state});
  }

  loginAsGuestEvent() {
    const fields = this.state.fields;
    const validationFields = {
      ...fields,
      firstName: {...fields.firstName, required: true},
      lastName: {...fields.lastName, required: true},
      password: {...fields.password, required: false}
    }

    const fieldsState = this.validFields(validationFields);
    if (fieldsState.valid){
      const leaseObj = this.leaseObj();
      this.props.loginAsGuest(leaseObj);
    }
  }

  loginAsUserEvent() {
    const fields = this.state.fields;
    const validationFields = {
      ...fields,
      firstName: {...fields.firstName, required: false},
      lastName: {...fields.lastName, required: false},
      password: {...fields.password, required: true}
    }

    const fieldsState = this.validFields(validationFields);
    if (fieldsState.valid){
      const leaseObj = this.leaseObj();
      //change for final login as user
      this.props.loginUser(fieldsState.fields, leaseObj);
    }
  }

  leaseObj(){
    const {booking} = this.props;
    return {
      providerId: booking.provider.Id,
      locationId: booking.location.id,
      offeringId: booking.service.offeringId,
      starDateTime: booking.timestamp.format()
    };
  }

  validFields(fieldsCopy){
    const fieldsState = checkFields(fieldsCopy)      
    this.setState({ fields: fieldsState.fields });
    return fieldsState;
  }
  responseFacebook(response){
    console.log(response);
  }

  render() {
    const {t} = this.props;
    return (
      <div className="credentials">
        <h2>{t('application.user_info.complete_info')}</h2>
        <div className="innerCredentials">
          <TextField 
            id="credentialsEmail"
            placeholder="Email *"
            onChange={this.onChangeFields.bind(this, 'email')}
            onKeyUp={this.typewatch.bind(this, this.emailExist.bind(this), 500)}
            { ...this.state.fields.email}
            />

            <FadeInOut show={this.props.user.isUser !== null } scroll={false}>
                <div>
                  {!this.props.user.isUser &&
                    <div>
                      <TextField 
                        placeholder={t('application.user_info.login_fields.firstName.placeholder')} 
                        onChange={this.onChangeFields.bind(this, 'firstName')} 
                        { ...this.state.fields.firstName}
                        />  

                      <TextField 
                        placeholder={t('application.user_info.login_fields.lastName.placeholder')}                          
                        onChange={this.onChangeFields.bind(this, 'lastName')} 
                        { ...this.state.fields.lastName}
                        />  

                      <TextField 
                        placeholder={t('application.user_info.login_fields.phoneNumber.placeholder')}                        
                        onChange={this.onChangeFields.bind(this, 'phoneNumber')} 
                        type="tel"
                        { ...this.state.fields.phoneNumber}/>  
                      <Checkbox
                        id="credentialsPassword"
                        name="credentialsPassword"
                        label={t('application.user_info.login_fields.enableSms.placeholder')} 
                        value={this.state.fields.sendSMS}
                      />                      
                    </div>
                  }

                  {this.props.user.isUser  && 
                    <div>
                      <TextField 
                            type="password" 
                            onChange={this.onChangeFields.bind(this, 'password')} 
                            placeholder={(this.props.user.isUser)? t('application.user_info.login_fields.password.placeholder') : t('application.user_info.login_fields.newPassword.placeholder')}
                            { ...this.state.fields.password} />
                      <ForgotPassword />                          
                    </div>

                  }

                  {!this.props.user.isUser ? (
                      <button 
                        className="yocaleButton"
                        onClick={this.loginAsGuestEvent.bind(this)}
                      >{t('application.user_info.continue_as_guest')}</button>

                      ) : (
                       <button 
                        className="yocaleButton"
                        onClick={this.loginAsUserEvent.bind(this)}
                      >{t('application.user_info.continue')}</button>
                        
                  )}
                  
                </div>
            </FadeInOut>

            {/* <FacebookLogin
              appId={facebookAppId}
              autoLoad={true}
              fields="first_name,last_name,gender,email,picture"
              callback={this.responseFacebook}
              cssClass="my-facebook-button-class"
            />*/}

        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { loginAsGuest, signupUser, userExists, loginUser }
)(translate()(Credentials))