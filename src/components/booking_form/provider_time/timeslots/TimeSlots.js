/*jshint loopfunc: true */

import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import moment from 'moment';

import { setBookingTime } from '../../../../actions/index';
import FontIcon from 'react-md/lib/FontIcons';

import './TimeSlots.scss';

function mapStateToProps(state) {
  return {
    booking: state.booking
  };
}

export class TimeSlots extends React.Component {

  state = {
    slots: [],
    timezone: ''
  }

  getActiveClassName(slot){
    slot = moment(slot.time);
    return classNames({
      active : this.props.booking.timestamp.hour() === slot.hour() && this.props.booking.timestamp.minutes() === slot.minutes()
    })
  }


  listItems() {
    // console.log('selectedDateObject:',this.props.selectedDateObject.startDate)
     const printTime = moment(this.props.selectedDateObject.startDate).format('LT');
    return this.props.selectedDateObject.timeSlots.map((slot, key) =>
      <li key={key} onClick={this.props.onSelected.bind(null, slot)} className={this.getActiveClassName(slot)}>
        {/*{moment(slot.time).utcOffset(this.state.timezone).format("h:mm A")}*/}
          {moment(slot.time).format("LT")}
        {!slot.allowConfirmedBookings &&
          <FontIcon>warning</FontIcon>
        }
      </li>
    )
  }

  componentWillMount() {
    this.setState({ timezone : (this.props.booking.userTimezone !== '')? this.props.booking.userTimezone.utc : ''});
  }

  render() {
    const {t} = this.props;
    if (!this.props.booking.timestamp){
      return (<div></div>);
    }
    const cloneTimestamp = this.props.booking.timestamp.clone();

    // console.log('TIME STAMP:',this.props.booking.timestamp._d);

    const selectedDateTime = this.props.booking.timestamp._d;
    let printDateTime = moment(selectedDateTime).format('dddd, MMMM Do YYYY');




    return (
      <div className="TimeSlots">
        
        <h4>{t('application.provider_time.select_time')}</h4>
        {/*{this.props.booking.timestamp !== "" &&*/}
           {/*cloneTimestamp.utcOffset(this.state.timezone).format("dddd, MMMM Do YYYY")*/}

        {/*}*/}
        {printDateTime}

        <div className="slotsAvailableLabel">{t('application.provider_time.slots_available', {count: this.props.selectedDateObject.timeSlots.length})}</div>
        <p className="unconfirmedBookingsMsg">
          <FontIcon>warning</FontIcon>
          Indicates a booking request and not a confirmed booking.
        </p>
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
