import React from 'react';
import {findDOMNode} from 'react-dom';

import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'underscore';

import { setBookingTime, fetchAvailabilities, changeMonthCalendar, allowConfirmedBooking, leaseBooking } from '../../../../actions/index';

import Datetime from 'react-datetime';
import FadeInOut from '../../../common/fade_in_out/FadeInOut';
import TimeSlots from '../timeslots/TimeSlots';

import './Calendar.scss';


function mapStateToProps(state) {
  return {
    booking: state.booking,
    availabilities: state.business.availabilities,
    isLoggedIn: state.user.isLoggedIn
  };
}

export class Calendar extends React.Component {

  state = {
    selectedDateObject: null,
    filteredDates: []
  }


  isValidDate(current){
    const timezone = (this.props.booking.userTimezone !== '')? this.props.booking.userTimezone.utc : '';
    return this.props.availabilities.some((availabilityDate) => {
      return availabilityDate.timeSlots.length > 0 && (current.format('YYYY-MM-DD') === moment(availabilityDate.startDate).utcOffset(timezone).format('YYYY-MM-DD'))
    })
  }

  getStatusColor(dayObj){
    if (!dayObj || dayObj.timeSlots.length === 0){
      return;
    }
    if (dayObj.timeSlots.length > 5){
      return 'green';
    }else{
      return 'red';
    }
  }

  renderDay(props, currentDate, selectedDate) {
    let theDay = this.props.availabilities.find((day) => {
      return moment(day.startDate).format('YYYY-MM-DD') === currentDate.format('YYYY-MM-DD');
    });

    return (
      <td {...props} >
        <span className={"circleAvailability " + this.getStatusColor(theDay)}></span>
        { currentDate.date() }
      </td>
      );
  }

  onSelectedTimeSlot(slot){
    this.props.setBookingTime(moment(slot.time), slot.providers);
    this.props.allowConfirmedBooking(slot.allowConfirmedBookings);
    this.props.onSlotSelected();
    // if this is a request, set lease to null
    if (!(slot.allowConfirmedBookings)) {
      this.props.booking.lease = null;
    }
    else {
      // taken out, dealt with this in InfoStepper && this.props.booking.lease !== null taken out from error checking
      if (this.props.isLoggedIn ){
        this.props.leaseBooking(true);
      }
    }
  }

  onChangeDate(selectedDate){
    const selectedDateObject = this.props.availabilities.find((availabilityDate) => {
      return moment(availabilityDate.startDate).format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD')
    })
    this.setState({selectedDateObject})
    this.props.setBookingTime(selectedDate)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.booking.provider && this.props.booking.provider.providerId !== nextProps.booking.provider.providerId){
      this.setState({selectedDateObject: null})
    }
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  clickCalendar(self, e){
    const clickedElementClass = self.target.parentElement.className;
    if (clickedElementClass === 'rdtNext'){
      this.props.changeMonthCalendar('add', 1);
      this.resetSelectedDate()
    }else if (clickedElementClass === 'rdtPrev'){
      this.props.changeMonthCalendar('subtract', 1);
      this.resetSelectedDate()
    }
  }

  resetSelectedDate(){
    this.setState({selectedDateObject: null})
  }

  render() {
    return (
      <div >
        <FadeInOut className="fades" show={this.props.booking.provider.fullName}>
          <div onClick={this.clickCalendar.bind(this)} >
          <Datetime
              input={false}
              timeFormat={false}
              onChange={this.onChangeDate.bind(this)}
              isValidDate={this.isValidDate.bind(this)}
              renderDay={this.renderDay.bind(this)}
            />
            </div>
        </FadeInOut>
        <FadeInOut show={this.state.selectedDateObject !== null}>
          <TimeSlots selectedDateObject={this.state.selectedDateObject} onSelected={this.onSelectedTimeSlot.bind(this)} />
        </FadeInOut>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {setBookingTime, fetchAvailabilities, changeMonthCalendar, allowConfirmedBooking, leaseBooking}
)(Calendar)
