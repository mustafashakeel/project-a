import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import moment from 'moment';

import './TimeSlots.scss';

function mapStateToProps(state) {
  return {

  };
}

export class TimeSlots extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      slots:[
        moment().set({'hour' : "7", 'minute'  : "30", 'second' : "00" }),
        moment().set({'hour' : "8", 'minute'  : "00", 'second' : "00" }),
        moment().set({'hour' : "12", 'minute'  : "00", 'second' : "00" }),
        moment().set({'hour' : "14", 'minute'  : "30", 'second' : "00" }),
        moment().set({'hour' : "15", 'minute'  : "00", 'second' : "00" })
      ] 
    };
    
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
      active : this.props.selectedDate.hour() === slot.hour() && this.props.selectedDate.minutes() === slot.minutes()
    })
  }

  render() {
    const {t} = this.props;
    return (
      <div className="TimeSlots">
        <h4>{t('application.provider_time.select_time')}</h4>
        {this.props.selectedDate !== "" &&
           this.props.selectedDate.format("dddd, MMMM Do YYYY")
        }
        <div className="slotsAvailableLabel">{t('application.provider_time.slots_available', {count: 5})}</div>
        <ul className="slotsAvailable">
          {this.listItems()}
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(translate()(TimeSlots))
