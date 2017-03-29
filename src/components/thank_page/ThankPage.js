import React from 'react';
import { connect } from 'react-redux';

import BookingSummary from './booking_summary/BookingSummary';
import ConfirmationEmail from './confirmation_email/ConfirmationEmail';

import './ThankPage.scss';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export class ThankPage extends React.Component {
  state = {
    showSummary: false
  }

  render() {
    const {business, booking} = this.props;
    console.log(this.props.user.isNewUser);
    console.log(this.state.showSummary);
    return (
      <div className="ThankPage">
        {(this.props.user.isNewUser && !this.state.showSummary) &&
          <div>
            <ConfirmationEmail/>
            <button 
              className="continueBtn"
              onClick={() => this.setState({showSummary: true})}
            >Continue</button>
          </div>
        }

        {this.state.showSummary &&
          <BookingSummary/>
        }
        
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(ThankPage)
