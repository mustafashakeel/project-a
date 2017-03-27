import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { fetchAvailabilities, setBookingProvider, fetchProviders } from '../../../actions/index';

import Calendar from './calendar/Calendar'

import SelectField from 'react-md/lib/SelectFields';
import Avatar from 'react-md/lib/Avatars';

import './ProviderTimeContent.scss';

function mapStateToProps(state) {
  return {
    availabilities: state.business.availabilities,
    currentTab: state.ui.currentTab,
    business: state.business,
    booking: state.booking
  };
}

export class ProviderTimeContent extends React.Component {

  onChangeProvider = (newValue, newValueIndex) => {
    this.props.setBookingProvider(this.props.business.providers[newValueIndex]);
  }

  providerList = () => {
    return this.props.business.providers.map((provider, index) => {
      return {
        ...provider,
        leftAvatar: <Avatar src={provider.picture} alt={provider.fullName}  />
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { business, booking } = this.props;
    if (nextProps.currentTab === 1 ) {
      if (Object.keys(nextProps.availabilities).length === 0){
        this.props.fetchAvailabilities();
      }
      if (nextProps.business.providers.length === 0){
        this.props.fetchProviders(business.info.id, booking.location.id, booking.service.offeringId);
      }
    }
  }

  render() {
    const { t, booking } = this.props;
    return (
      <div className="ProviderTimeContent">
        <SelectField
          id="selectProvider"
          placeholder={t('application.provider_time.select_provider')}
          position={SelectField.Positions.BELOW}
          menuItems={this.providerList()}
          itemLabel="fullName"
          itemValue="fullName"
          value={booking.provider.fullName}
          onChange={this.onChangeProvider.bind(this)}
          className="dropdownSelect"
          iconChildren="keyboard_arrow_down"
        />

        <Calendar onSlotSelected={this.props.onFinish}/>
      </div>

    );
  }
}

export default connect(
  mapStateToProps,
  {fetchAvailabilities, setBookingProvider, fetchProviders}
)(translate()(ProviderTimeContent))
