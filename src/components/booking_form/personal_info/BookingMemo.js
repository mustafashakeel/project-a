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
          rows={2}
          block
          paddedBlock
          className="SelectSimpleBorder"
          maxRows={4}
        />
        <div className="BookingNotification">
          <h4>{t('application.user_info.notification')}</h4>
          <div className="selectGroup">
          
              <SelectField
                id="emailNote"
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
)(translate()(BookingMemo))
