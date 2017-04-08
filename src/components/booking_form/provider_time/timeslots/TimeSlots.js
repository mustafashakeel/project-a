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
    const timezone = (this.props.booking.userTimezone !== '')? this.props.booking.userTimezone.utc : '';

    return this.props.selectedDateObject.timeSlots.map((slot, key) =>
      <li key={key} onClick={this.props.onSelected.bind(null, slot)}>
        {slot.time.clone().utcOffset(timezone).format("h:mm A")}
      </li>
    )
  }

  render() {
    const {t} = this.props;
    const timezone = (this.props.booking.userTimezone !== '')? this.props.booking.userTimezone.utc : '';
    const cloneTimestamp = this.props.booking.timestamp.clone();
    return (
      <div className="TimeSlots">
        <h4>{t('application.provider_time.select_time')}</h4>
        {this.props.booking.timestamp !== "" &&
           cloneTimestamp.utcOffset(timezone).format("dddd, MMMM Do YYYY")
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
