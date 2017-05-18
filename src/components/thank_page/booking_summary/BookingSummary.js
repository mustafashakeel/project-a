import React from 'react';
import { connect } from 'react-redux';

import SelectField from 'react-md/lib/SelectFields';

function mapStateToProps(state) {
  return {
    booking: state.booking,
    business: state.business.info
  };
}

export class BookingSummary extends React.Component {

  state = {
    calendars: ["Google Calendar", "Apple iCal", "Outlook"],
    selectedCalendar: ""
  }

  openCalendar() {
    let url;

    if(this.state.selectedCalendar === ""){
      return;
    }

    switch(this.state.selectedCalendar){
      case "Google Calendar":
        url = this.props.booking.booked_summary.addToGoogleCalendarUrl;
      break;
      case "Apple iCal":
        url = this.props.booking.booked_summary.addToAppleICalUrl;
      break;
      case "Outlook":
        url = this.props.booking.booked_summary.addToOutlookUrl;
      break;
      default:break;

    }
    window.open(url, '_blank');
  }

  render() {
    const {business, booking} = this.props;
    console.log(booking.timestamp);
    return (
      <div>
        {booking.allowConfirmedBooking ?
          <h4>Your booking is confirmed! An email has been sent to you.</h4>
          :
          <h4>Appointment has been requested, you will receive an email when {business.name} has confirmed this appointment.</h4>
        }
        <div className="appointmentInfo">
          <div className="bizName">{business.name}</div>
          <div className="bizAddress">{booking.location.address}</div>
          <div className="serviceName">{booking.service.name}</div>
          <div className="providerName">{booking.provider.name}</div>
          <div className="bookingTime">{booking.timestamp.subtract(booking.service.duration, 'm').format("h:mm a")} - {booking.timestamp.add(booking.service.duration, 'm').format("h:mm a")}</div>
          <div className="bookingDate">{booking.timestamp.format("dddd, MMMM Do YYYY")}</div>
            <SelectField
              id="addToCalendar"
              placeholder="Select calendar"
              position={SelectField.Positions.BELOW}
              menuItems={this.state.calendars}
              value={this.state.selectedCalendar}
              onChange={(calendar) => this.setState({"selectedCalendar": calendar})}
              className="dropdownSelect"
              iconChildren="keyboard_arrow_down"
            />

          <div className="yocaleButton addToCalendar" onClick={this.openCalendar.bind(this)}>Add to Calendar</div>
          <a className="viewEditYocale" href="https://www.yocale.com/Account/Login?ReturnUrl=%2FUserProfile%2FConsumerAppointments%3FsortBy%3DmostRecent" target="_blank">View or Edit Appointment on Yocale</a>
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
)(BookingSummary)
