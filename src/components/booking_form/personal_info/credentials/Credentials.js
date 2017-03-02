import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { fetchUser } from '../../../../actions/index';

import validator from 'validator';
import { checkFields } from '../../../../utils';

import TextField from 'react-md/lib/TextFields';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import FadeInOut from '../../../common/fade_in_out/FadeInOut';

import './Credentials.scss'; 

function mapStateToProps(state) {
  return {
    user: state.user
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

  onChangeEmail = (email) => {
    this.props.fetchUser(email);
    this.setState({
      isValidEmail: validator.isEmail(email)
    })
  }

  onChangeFields = (key, value) => {
    var state = this.state.fields;
    state[key].value = value;
    this.setState({ fields: state});
  }

  createAccountEvent = () => {
    if(!this.state.creatingNewAccount ){
      // Showing new user fields
      this.setState({ creatingNewAccount: true });
    }else{
      // Creating new account
      const fieldsCopy = this.state.fields;
      const fieldsState = checkFields(fieldsCopy)      
      this.setState({ fields: fieldsState.fields });

      if (fieldsState.valid){
        console.log("Creating account");
        this.props.hideCredentials();
      }

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
            placeholder="Email *"
            onChange={this.onChangeEmail.bind(this)} 
            value={this.props.user.credentials.email}
            { ...this.state.fields.email}
            />

            <FadeInOut show={this.state.isValidEmail || this.props.user.isUser}>
                <div>
                  <FadeInOut show={this.state.creatingNewAccount}>
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
                        label={t('application.user_info.login_fields.enableSms.placeholder')} 
                        value={this.state.fields.sendSMS}
                      />                      
                    </div>
                  </FadeInOut>

                  {(this.props.user.isUser || this.state.creatingNewAccount) && 
                    <TextField 
                          type="password" 
                          onChange={this.onChangeFields.bind(this, 'password')} 
                          placeholder={(this.props.user.isUser)? t('application.user_info.login_fields.password.placeholder') : t('application.user_info.login_fields.newPassword.placeholder')}
                          { ...this.state.fields.password} />
                  }

                  {!this.props.user.isUser &&
                    <button 
                      className="yocaleButton"
                      onClick={this.createAccountEvent.bind(this)}
                    >{t('application.user_info.create_account')}</button>
                  }

                  {!this.state.creatingNewAccount &&
                    <button 
                      className="yocaleButton"
                      onClick={this.props.hideCredentials}
                    >{(this.props.user.isUser)? t('application.user_info.continue') : t('application.user_info.continue_as_guest')}</button>
                  }
                  
                </div>
            </FadeInOut>


        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { fetchUser }
)(translate()(Credentials))