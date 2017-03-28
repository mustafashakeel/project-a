import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    booking: state.booking,
    business: state.business.info
  };
}

export class BookingSummary extends React.Component {
  render() {
    const {business, booking} = this.props;
    return (
      <div>
        <h4>Your booking is confirmed! An email has been sent to you.</h4>
        {/*<div className="appointmentInfo">
          <div className="bizName">{business.name}</div>
          <div className="bizAddress">{booking.location.address}</div>
          <div className="serviceName">{booking.service.name}</div>
          <div className="providerName">{booking.provider.name}</div>
          <div className="bookingTime">{booking.timestamp.format("h:mm a")} - {booking.timestamp.add(booking.service.OfferingDuration, 'm').format("h:mm a")}</div>
          <div className="bookingDate">{booking.timestamp.format("dddd, MMMM Do YYYY")}</div>
          <div className="yocaleButton addToCalendar">Add to Calendar</div>
          <div className="viewEditYocale">View or Edit Appointment on Yocale</div>
        </div>*/}

        <div className="moreServices">
          
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(BookingSummary)
