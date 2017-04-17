import React from 'react';
import { connect } from 'react-redux';

import BookingSummary from './booking_summary/BookingSummary';
import UpdatePassword from './update_password/UpdatePassword';

import './ThankPage.scss';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export class ThankPage extends React.Component {
  state = {
    showSummary: true
  }

  componentWillMount() {
    if (this.props.user.setNewPassword){
      this.setState({ showSummary: false})
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.user.passwordUpdated !== nextProps.user.passwordUpdated && nextProps.user.passwordUpdated === true){
      this.setState({ showSummary: true})
    }
  }

  render() {
    const {user} = this.props;
    return (
      <div className="ThankPage">
        {!this.state.showSummary ?
          <div>
            <UpdatePassword/>
            <button 
              className="continueBtn"
              onClick={() => this.setState({showSummary: true})}
            >Continue</button>
          </div>
        :
          <BookingSummary/>
        }
        
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(ThankPage)
