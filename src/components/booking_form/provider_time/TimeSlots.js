import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import moment from 'moment';

import { setBookingTime } from '../../../actions/index';

import './TimeSlots.scss';

function mapStateToProps(state) {
  return {
    booking: state.booking
  };
}

export class TimeSlots extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      slots:[] 
    };
    
  }

  createTimeSlots (){
    const slots = [];
    const serviceTime = 30;
    const startTime = moment(this.props.selectedDateObject._schedules[0]._startTime);
    const endTime = moment(this.props.selectedDateObject._schedules[0]._endTime).subtract(serviceTime, 'm');
    const bookings = this.props.selectedDateObject._schedules[0]._bookings;
    let newTime = startTime.clone();
    while ( newTime.isBefore(endTime)){
      const booked = bookings.find((booked) => {
        return newTime.isBetween(booked._startTime, booked._endTime) || newTime.isSame(booked._startTime);               
      })
      if (booked){
        newTime = moment(booked._endTime)
      }
      slots.push(newTime.clone());   

      newTime = newTime.add(serviceTime, 'm');
    }
    this.setState( { slots });
  }

  listItems = () => {
    return this.state.slots.map((slot, key) =>
      <li key={key} onClick={this.props.onSelected.bind(null, slot)} className={this.getActiveClassName(slot)}>
        {slot.format("h:mm a")}
      </li>
    )
  }

  getActiveClassName = (slot) => {
    return classNames({
      active : this.props.booking.timestamp.hour() === slot.hour() && this.props.booking.timestamp.minutes() === slot.minutes()
    })
  }

  componentWillReceiveProps(nextProps) {
    this.createTimeSlots()  
  }

  render() {
    const {t} = this.props;
    return (
      <div className="TimeSlots">
        <h4>{t('application.provider_time.select_time')}</h4>
        {this.props.booking.timestamp !== "" &&
           this.props.booking.timestamp.format("dddd, MMMM Do YYYY h:mm")
        }
        <div className="slotsAvailableLabel">{t('application.provider_time.slots_available', {count: this.state.slots.length})}</div>
        <ul className="slotsAvailable">
          {this.listItems()}
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {setBookingTime}
)(translate()(TimeSlots))
