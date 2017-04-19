  import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { isLoggedIn, setBookingDependant } from '../../../../../actions/index';

import FadeInOut from '../../../../common/fade_in_out/FadeInOut';
import TextField from 'react-md/lib/TextFields';
import Dependants from './dependants/Dependants';

import './LoginInfo.scss';

function mapStateToProps(state) {
  return {
    user: state.user,
    booking: state.booking
  };
}

export class LoginInfo extends React.Component {
  state = {
    bookDependant: false
  }

  onChangeDependant(newVal) {
    this.props.setBookingDependant(newVal)
  }

  componentWillReceiveProps(nextProps) {
    const fields = this.state.fields;
    fields.dependantName.value = nextProps.booking.dependant;
    this.setState({ fields });
  }

  componentWillUpdate(nextProps, nextState) {
    if(!nextState.bookDependant && this.props.booking.dependant !== ''){
      this.props.setBookingDependant('')
    }
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

          {this.state.bookDependant && 
            <Dependants/>  
          }
          
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { isLoggedIn, setBookingDependant }
)(translate()(LoginInfo))
