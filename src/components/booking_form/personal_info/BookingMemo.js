import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import TextField from 'react-md/lib/TextFields';
import SelectField from 'react-md/lib/SelectFields';

import './BookingMemo.scss';

function mapStateToProps(state) {
  return {

  };
}

export class BookingMemo extends React.Component {

  render() {
    const {t} = this.props;
    return (
      <div className="BookingMemo">
        <h4>{t('application.user_info.add_note')}</h4>
        <TextField
          id="bookingNote"
          rows={1}
          block
          className="SelectSimpleBorder"
          maxRows={4}
        />
        <div className="BookingNotification">
          <h4>{t('application.user_info.notification')}</h4>
          <div className="selectGroup">
          
              <SelectField
                id="emailNote"
                className="SelectSimpleBorder selectNotification"
                menuItems={['Email', 'Call']}
                position={SelectField.Positions.BELOW}
                value={'Email'}
                iconChildren="keyboard_arrow_down"
              />
              <SelectField
                id="hoursNote"
                className="SelectSimpleBorder selectNotification"
                menuItems={['24 hours', '48 hours']}
                value={'24 hours'}
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
)(translate()(BookingMemo))
