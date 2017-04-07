import React from 'react';
import {findDOMNode} from 'react-dom';
import getElement from 'react-get-element';

import { connect } from 'react-redux';
import moment from 'moment-timezone';
import _ from 'underscore';

import { setBookingTime, fetchAvailabilities } from '../../../../actions/index';

import Datetime from 'react-datetime';
import FadeInOut from '../../../common/fade_in_out/FadeInOut';
import TimeSlots from '../timeslots/TimeSlots';

import './Calendar.scss';


function mapStateToProps(state) {
  return {
    booking: state.booking,
    availabilities: state.business.availabilities
  };
}

export class Calendar extends React.Component {

  state = {
    selectedDateObject: null,
    filteredDates: []
  }

  constructor(props) {
    super(props);
    // var names = Object.keys(moment.tz._zones)
    //     .map(function(k) { return moment.tz._zones[k].split('|')[0]; })
    //     .filter(function(z) { return z.indexOf('/') >= 0; })
    //     .sort();
    // console.log(names);
  }

  isValidDate = (current) => {
    return this.props.availabilities.some((availabilityDate) => {
      return current.isSame( moment(availabilityDate.startDate), 'day' )
    })
  }

  getStatusColor = (dayObj) => {
    if (!dayObj){
      return;
    }
    if (dayObj.timeSlots.length > 5){
      return 'green';
    }else{
      return 'red';
    }
  }

  renderDay = (props, currentDate, selectedDate) => {
    const theDay = this.props.availabilities.find((day) => {
      return day.startDate == currentDate.format('YYYY-MM-DD');
    });
    return (
      <td {...props} >
        <span className={"circleAvailability " + this.getStatusColor(theDay)}></span>
        { currentDate.date() }
      </td>
      );
  }

  onSelectedTimeSlot = (slot) => {

    this.props.booking.timestamp.set({
        'hour': slot.time.hour(),
        'minutes': slot.time.minutes()
    });
    this.props.setBookingTime(this.props.booking.timestamp);
    // this.props.onSlotSelected();
  }

  onChangeDate = (selectedDate) => {
    const selectedDateObject = this.props.availabilities.find((availabilityDate) => {
      return moment(availabilityDate.startDate).day() === selectedDate.day()
    })
    this.setState({selectedDateObject})
    this.props.setBookingTime(selectedDate)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.booking.provider && this.props.booking.provider.providerId !== nextProps.booking.provider.providerId){
      this.setState({selectedDateObject: null})
    }
   

  }

  componentWillUpdate(nextProps, nextState) {
    const b = findDOMNode(this.refs.calendarContainer);
    console.log(b.closest('div > .rdt'));
    // console.log(this.refs.calendarContainer);
    // console.log(findDOMNode(this.refs.calendarContainer.refs.fade_children));
  }

  clickCalendar(self, e){
    console.log(self.target.tagName);
  }

  render() {
    return (
      <div >
        <FadeInOut className="fades" ref="calendarContainer" show={this.props.booking.provider.fullName && this.props.availabilities.length}>
          <div onClick={this.clickCalendar} >
          <Datetime
              ref="calendar"
              
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
  {setBookingTime, fetchAvailabilities}
)(Calendar)
