import React from 'react';

import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import TextField from 'react-md/lib/TextFields';
import SelectField from 'react-md/lib/SelectFields';

import { setProviderMessage } from '../../../../../actions/index';

import './BookingNote.scss';

function mapStateToProps(state) {
  return {
    booking: state.booking
  };
}
export class BookingNote extends React.Component {

  onChangeMessage(value){
    this.props.setProviderMessage(value);
  }

  render() {
    const {t, booking} = this.props;
    return (
      <div className="BookingNote">
        <h4>{t('application.user_info.add_note')}</h4>
        <p>{booking.provider.bookingCommentDescription}</p>
        <TextField
          id="BookingNote"
          rows={2}
          value={booking.providerMessage}
          onChange={this.onChangeMessage.bind(this)}
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
  { setProviderMessage }
)(translate()(BookingNote))