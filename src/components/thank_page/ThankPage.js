import React from 'react';
import { connect } from 'react-redux';

import './ThankPage.scss';

function mapStateToProps(state) {
  return {

  };
}

export class ThankPage extends React.Component {
  render() {
    return (
      <div className="ThankPage">
        <h4>Your booking is confirmed! An email has been sent to you.</h4>
        <div className="appointmentInfo">
          <div className="bizName">Anastasia Beuty Salon</div>
          <div className="bizAddress">1625 Horny St Unit 102</div>
          <div className="serviceName">Infrared Sauna</div>
          <div className="providerName">Jenny Provider</div>
          <div className="bookingTime">3:00 PM - 4:00 PM</div>
          <div className="bookingDate">December 10, 2016</div>
          <div className="yocaleButton addToCalendar">Add to Calendar</div>
          <div className="viewEditYocale">View or Edit Appointment on Yocale</div>
        </div>

        <div className="moreServices">
          
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(ThankPage)
