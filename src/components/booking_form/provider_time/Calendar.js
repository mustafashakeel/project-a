import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { setBookingTime } from '../../../actions/index';

import Datetime from 'react-datetime';
import FadeInOut from '../../common/fade_in_out/FadeInOut';
import TimeSlots from './TimeSlots'

import availability from './availability';

import './Calendar.scss';


function mapStateToProps(state) {
  return {
    booking: state.booking
  };
}

export class Calendar extends React.Component {

  state = {
    selectedDate: ""
  }

  isValidDate = (current) => {
    return availability._days.some((availabilityDate) => {
      return current.isSame( moment(availabilityDate._date), 'day' )
    })
  }

  getRandColors = () => {
    const colors = ["red", "green", "yellow"];
    const rand = Math.floor((Math.random() * 3) );
    return colors[rand];
  }

  renderDay = (props, currentDate, selectedDate) => {
    return (
      <td {...props} >
        <span className={"circleAvailability " + this.getRandColors()}></span>
        { currentDate.date() }
      </td>
      );
  }

  onSelectedTimeSlot = (slot) => {
    this.props.booking.timestamp.set({
        'hour': slot.hour(),
        'minutes': slot.minutes()
    });
    this.props.setBookingTime(this.props.booking.timestamp);
    this.props.onSlotSelected();
  }

  onChangeDate = (selectedDate) => {
    this.props.setBookingTime(selectedDate)
  }

  render() {
    return (
      <div>
        <Datetime
            input={false}
            timeFormat={false}
            onChange={this.onChangeDate.bind(this)}
            isValidDate={this.isValidDate}
            renderDay={this.renderDay}
          />
        <FadeInOut show={this.props.booking.timestamp !== null}>
          <TimeSlots selectedDate={this.props.booking.timestamp} onSelected={this.onSelectedTimeSlot.bind(this)} />
        </FadeInOut>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {setBookingTime}
)(Calendar)
