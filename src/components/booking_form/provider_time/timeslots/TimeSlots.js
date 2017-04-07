/*jshint loopfunc: true */

import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import moment from 'moment';

import { setBookingTime } from '../../../../actions/index';

import './TimeSlots.scss';

function mapStateToProps(state) {
  return {
    booking: state.booking
  };
}

export class TimeSlots extends React.Component {

  state = {
    slots: []
  }

  listItems() {
    return this.state.slots.map((slot, key) =>
      <li key={key} onClick={this.props.onSelected.bind(null, slot)} className={this.getActiveClassName(slot)}>
        {slot.time.format("HH:mm A")}
      </li>
    )
  }

  createTimeSlots(timeslots){
    const slots = [];
    timeslots.map((slot, key) => {
      slots.push({
        provider: slot.provider,
        time: moment(slot.time, "HH:mm A")
      });
    });
    this.setState({ slots });
  }

  getActiveClassName(slot) {
    return '';
    return classNames({
      active : this.props.booking.timestamp.hour() === slot.hour() && this.props.booking.timestamp.minutes() === slot.minutes()
    })
  }

  componentWillReceiveProps(nextProps) {
    this.createTimeSlots(nextProps.selectedDateObject.timeSlots) 

  }

  render() {
    const {t} = this.props;
    return (
      <div className="TimeSlots">
        <h4>{t('application.provider_time.select_time')}</h4>
        {this.props.booking.timestamp !== "" &&
           this.props.booking.timestamp.format("dddd, MMMM Do YYYY h:mm")
        }
        <div className="slotsAvailableLabel">{t('application.provider_time.slots_available', {count: this.props.selectedDateObject.timeSlots.length})}</div>
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
