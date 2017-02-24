import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { fetchUser } from '../../../actions/index';

import isEmail from 'validator/lib/isEmail';

import Button from 'react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields';
import FadeInOut from '../../common/fade_in_out/FadeInOut';

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
    const { t } = this.props;
    return (this.props.user.isUser)? t('application.user_info.enter_password') : t('application.user_info.create_password');

  }  

  onChangeEmail = (email) => {
    this.props.fetchUser(email);
    this.setState({
      isValidEmail: isEmail(email)
    })
  }

  showLabelContinueBtn = () => {
    const {t} = this.props;
    return (this.props.user.isUser)? t('application.user_info.continue') : t('application.user_info.continue_as_guest')
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
            value={this.props.user.credentials.email}/>

            <FadeInOut className="timeAvailability" show={this.state.isValidEmail || this.props.user.isUser}>
                <div>
                  <TextField 
                    id="credentialsPassword" 
                    type="password" 
                    placeholder={this.getPasswordLabel()} />

                  {!this.props.user.isUser &&
                    <button 
                      className="yocaleButton"
                      onClick={this.props.hideCredentials}
                    >{t('application.user_info.create_account')}</button>
                  }

                  <button 
                    className="yocaleButton"
                    onClick={this.props.hideCredentials}
                  >{this.showLabelContinueBtn()}</button>
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