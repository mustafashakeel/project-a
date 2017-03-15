import React from 'react';
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
    return this.state.filteredDates.some((availabilityDate) => {
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
    const selectedDateObject = this.props.availabilities._days.find((availabilityDate) => {
      return moment(availabilityDate._date).day() === selectedDate.day()
    })
    this.setState({selectedDateObject})
    this.props.setBookingTime(selectedDate)
  }

  filterDatesByProvider(providerId) {
    const filteredDates = _.filter(this.props.availabilities._days, (day) => {
      return day._schedules[0]._providers.some((provider) => {
        return providerId === provider.Id;
      });
    })

    this.setState({filteredDates})

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.booking.provider && this.props.booking.provider.Id !== nextProps.booking.provider.Id){
      this.setState({selectedDateObject: null})
    }
    this.filterDatesByProvider(nextProps.booking.provider.Id);
  }

  componentWillMount() {
    this.props.fetchAvailabilities();
  }

  render() {
    return (
      <div>
        <FadeInOut show={this.props.booking.provider.fullName}>
          <Datetime
              input={false}
              timeFormat={false}
              onChange={this.onChangeDate.bind(this)}
              isValidDate={this.isValidDate.bind(this)}
              renderDay={this.renderDay}
            />
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
