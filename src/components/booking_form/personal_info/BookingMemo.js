import React from 'react';
import { connect } from 'react-redux';

import TextField from 'react-md/lib/TextFields';
import SelectField from 'react-md/lib/SelectFields';

import './BookingMemo.scss';

function mapStateToProps(state) {
  return {

  };
}

export class BookingMemo extends React.Component {

  render() {
    return (
      <div className="BookingMemo">
        <h4>Add note</h4>
        <TextField
          id="bookingNote"
          rows={1}
          block
          paddedBlock
          className="SelectSimpleBorder"
          maxRows={4}
        />
        <div className="BookingNotification">
          <h4>Notification</h4>
          <div className="selectGroup">
          
              <SelectField
                id="emailNote"
                block
                className="SelectSimpleBorder md-cell--2-phone"
                menuItems={['Email', 'Call']}
                position={SelectField.Positions.BELOW}
                defaultValue={'Email'}
                iconChildren="keyboard_arrow_down"
              />
              <SelectField
                id="hoursNote"
                className="SelectSimpleBorder"
                menuItems={['24 hours', '48 hours']}
                defaultValue={'24 hours'}
                position={SelectField.Positions.BELOW}
                iconChildren="keyboard_arrow_down"
              />
            </div>         
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(BookingMemo)
