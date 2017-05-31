/*globals gapi */

import React from 'react';
import _ from 'underscore';

import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { loginAsGuest, signupUser, userExists, loginUser, loginWithSocial } from '../../../../actions/index';

import validator from 'validator';
import { checkFields } from '../../../../utils';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import ForgotPassword from './forgot_password/ForgotPassword';

import TextField from 'react-md/lib/TextFields';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import FadeInOut from '../../../common/fade_in_out/FadeInOut';

import './Credentials.scss';

// const facebookAppId = '530831383784789';
const facebookAppId = '682874588564067';
// const googleClientId = '449316408280-d964jotbr0qhvuud8n7nm4e0n9so4v5i.apps.googleusercontent.com';
const googleClientId = '789100150140-angpfauj39a9a6v7u088s3l0isof3ve8.apps.googleusercontent.com';
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
        },
        sendSms: {
          required: false,
          value: false
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
    this.setState({
      isValidEmail: isValidEmail
    });
    let fields = this.state.fields;
    if (isValidEmail) {
      fields = this.state.fields;
      fields.email.error = false;
      this.setState({ fields: fields })
      this.props.userExists(email);
    }else{
      fields = this.state.fields;
      fields.email.error = true;
      this.setState({ fields: fields })
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
      password: {...fields.lastName, required: false},
    }

    const fieldsState = this.validFields(validationFields);

    if (fieldsState.valid && this.state.isValidEmail){
      this.props.loginAsGuest(fieldsState.fields);
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
      this.props.loginUser(fieldsState.fields);
    }
  }

  loginSocial(){
    const data = {
      email: this.state.fields.email,
      password: { value: "" }
    };

    this.props.loginUser(data);
  }

  validFields(fieldsCopy){
    const fieldsState = checkFields(fieldsCopy)
    this.setState({ fields: fieldsState.fields });
    return fieldsState;
  }

  responseFacebook(facebookUser){
    console.log(facebookUser);
    console.log(facebookUser.status);
    if(facebookUser.status){
      return;
    }
    const userData  = {
      firstName: facebookUser.first_name,
      lastName: facebookUser.last_name,
      imageUrl: facebookUser.picture.data.url,
      userID: facebookUser.userID,
      provider: "Facebook",
      email: this.state.fields.email.value
    }
    console.log(userData);
    this.props.loginWithSocial(userData);

  }

  responseGoogle(googleUser){
    if(googleUser.error){
      return;
    }

    const googleProfile = googleUser.getBasicProfile();
    const userData  = {
      firstName: googleProfile.getGivenName(),
      lastName: googleProfile.getFamilyName(),
      imageUrl: googleProfile.getImageUrl(),
      userID: googleProfile.getId(),
      provider: "Google",
      email: this.state.fields.email.value
    }
    console.log(userData);
    this.props.loginWithSocial(userData);
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.fields.phoneNumber.value !== "" && nextState.fields.phoneNumber.value.length === 1 && this.state.fields.sendSms.value === false){
      this.onChangeFields('sendSms', true);
    }
  }

  render() {
    const {t} = this.props;
    return (
      <div className="credentials">
        <h2>{t('application.user_info.complete_info')}</h2>
        <div className="innerCredentials">
          <TextField
            id="credentialsEmail"
            className="credentialsEmail"
            placeholder="Email *"
            onChange={this.onChangeFields.bind(this, 'email')}
            onKeyUp={this.typewatch.bind(this, this.emailExist.bind(this), 500)}
            { ...this.state.fields.email}
            />

            <FadeInOut show={this.props.user.isUser !== null } scroll={false}>
                <div>
                  {!this.props.user.isUser &&
                    <div>
                      <p className="createAccountMsg">This appears to be your first booking with this email address on Yocale, provide us with the following</p>
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
                        onChange={this.onChangeFields.bind(this, 'sendSms')}
                        checked={this.state.fields.sendSms.value}
                      />
                    </div>
                  }

                  {this.props.user.isUser && this.props.user.accountType === "Yocale" &&
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
                      <div>
                      {this.props.user.accountType === "Yocale" &&
                         <button
                          className="yocaleButton"
                          onClick={this.loginAsUserEvent.bind(this)}
                        >{t('application.user_info.continue')}</button>
                      }
                      {this.props.user.accountType === "Facebook" &&

                        <FacebookLogin
                          appId={facebookAppId}
                          autoLoad={false}
                          fields="first_name,last_name,gender,email,picture"
                          callback={this.responseFacebook.bind(this)}
                          cssClass="yocaleButton facebookButton"
                          className="yocaleButton facebookButton"
                        />
                      }
                      {this.props.user.accountType === "Google" &&
                        <GoogleLogin
                          clientId={googleClientId}
                          className="yocaleButton googleButton"
                          buttonText="Login with Google"
                          onSuccess={this.responseGoogle.bind(this)}
                          onFailure={this.responseGoogle.bind(this)}
                          />
                        }
                      </div>

                  )}

                </div>
            </FadeInOut>
            {/*!this.props.user.isUser &&
              <div className="socialButtons">
                <FacebookLogin
                  appId={facebookAppId}
                  autoLoad={false}
                  fields="first_name,last_name,gender,email,picture"
                  callback={this.responseFacebook.bind(this)}
                  cssClass="yocaleButton facebookButton"
                />
                <GoogleLogin
                  clientId={googleClientId}
                  className="yocaleButton googleButton"
                  buttonText="Login with Google"
                  onSuccess={this.responseGoogle.bind(this)}
                  onFailure={this.responseGoogle.bind(this)}
                  />
              </div>
            */}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { loginAsGuest, signupUser, userExists, loginUser, loginWithSocial }
)(translate()(Credentials))
