import React from 'react';

import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import TextField from 'react-md/lib/TextFields';
import SelectField from 'react-md/lib/SelectFields';
import './BookingNote.scss';

function mapStateToProps(state) {
  return {
  };
}
export class BookingNote extends React.Component {
  render() {
    const {t} = this.props;
    return (
      <div className="BookingNote">
        <h4>{t('application.user_info.add_note')}</h4>
        <TextField
          id="BookingNote"
          rows={2}
          block
          paddedBlock
          className="SelectSimpleBorder"
          maxRows={4}
        />        
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(translate()(BookingNote))