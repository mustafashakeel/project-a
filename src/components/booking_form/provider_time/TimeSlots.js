import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

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
    return (
      <div className="TimeSlots">
        <h4>Select a time</h4>
        {this.props.selectedDate !== "" &&
           this.props.selectedDate.format("dddd, MMMM Do YYYY h:mm a")
        }
        <div className="slotsAvailableLabel">5 Slots Available</div>
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
)(TimeSlots)
