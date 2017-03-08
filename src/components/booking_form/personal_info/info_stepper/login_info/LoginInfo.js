import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { isLoggedIn } from '../../../../../actions/index';
import { checkFields } from '../../../../../utils';

import FadeInOut from '../../../../common/fade_in_out/FadeInOut';
import TextField from 'react-md/lib/TextFields';

import './LoginInfo.scss';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export class LoginInfo extends React.Component {
  state = {
    bookDependant: false,
    fields: {
      dependantName: {
        placeholder: "Dependant name",
        value:'',
        required: true
      }
    }
  }

  onChangeDependant(newVal) {
    const fields = this.state.fields;
    fields.dependantName.value = newVal;
    this.setState({ fields });
  }

  render() {
    const {t} = this.props;
    return (
      <div className="LoginInfo">
        <h4>
          {t('application.user_info.logged_in', {name: this.props.user.credentials.firstName || this.props.user.credentials.email})}
          &nbsp;&nbsp;
          <span 
            className="underline pointer" 
            onClick={this.props.isLoggedIn.bind(null, false)}>Logout</span>
        </h4>
        <div className="stepContent">          
          <p 
            className="underline pointer"
            onClick={()=> this.setState({ bookDependant: !this.state.bookDependant })}>
            {!this.state.bookDependant ?
              <span>Book for a dependant instead?</span>
              :
              <span>Book for myself</span>
            }
          </p>
          <FadeInOut show={this.state.bookDependant} scroll={false}>
            <TextField 
              className="dependantInput"
              onChange={this.onChangeDependant.bind(this)} 
              { ...this.state.fields.dependantName}
            />  
          </FadeInOut>
          
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { isLoggedIn }
)(translate()(LoginInfo))
