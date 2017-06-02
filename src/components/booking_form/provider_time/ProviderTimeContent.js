import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { fetchAvailabilities, setBookingProvider, fetchProviders, setUserTimezone, setBookingTime } from '../../../actions/index';
import timezones from '../../../reducers/mocks/timezones';

import FadeInOut from '../../common/fade_in_out/FadeInOut';
import Calendar from './calendar/Calendar';

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

  onChangeProvider(newValue, newValueIndex){
    this.props.setBookingProvider(this.props.business.providers[newValueIndex]);
  }

  providerList(){
    return this.props.business.providers.map((provider, index) => {
      return {
        ...provider,
        leftAvatar: <Avatar src={provider.picture} alt={provider.fullName}  />
      }
    });
  }

  onChangeTimezone(newValue, newValueIndex){
    this.props.setUserTimezone(timezones[newValueIndex]);

    if( this.props.booking.provider.providerId){
      this.props.fetchAvailabilities();
      this.child.resetSelectedDate();
    }

  }

  componentWillReceiveProps(nextProps) {
    const { business, booking } = nextProps;
      if ( this.props.currentTab === 1 && booking.provider.providerId !== this.props.booking.provider.providerId){
        this.props.setBookingTime(null);
        this.child.resetSelectedDate();
        this.props.fetchAvailabilities();

      }
      if (booking.service.offeringId && booking.service.offeringId !== this.props.booking.service.offeringId){
        if (booking.provider.providerId !== null){
          this.props.setBookingProvider({});
        }
        this.props.fetchProviders(business.info.id, booking.location.id, booking.service.offeringId);
      }
  }

  render() {
    const { t, booking, business } = this.props;
    return (
      <div className="ProviderTimeContent">
        { business.info.allowLocalizedTime &&
          <div className="TimeZoneSelector">
            <SelectField
              id="TimeZoneSelec"
              placeholder="Select your timezone"
              position={SelectField.Positions.BELOW}
              menuItems={timezones}
              itemLabel="DisplayName"
              itemValue="TimeZoneInfoId"
              value={booking.userTimezone.TimeZoneInfoId}
              onChange={this.onChangeTimezone.bind(this)}
              className="dropdownSelect"
              iconChildren="keyboard_arrow_down"
            />
          </div>
        }
        <FadeInOut show={!business.info.allowLocalizedTime || booking.userTimezone !== ""} scroll={false}>
          <div className="ProviderSelector">
            <FadeInOut className="ProviderSelectedPicture" show={booking.provider.picture} scroll={false}>
              <Avatar src={booking.provider.picture} alt={booking.provider.fullName} />
            </FadeInOut>
            <SelectField
              id="selectProvider"
              placeholder={t('application.provider_time.select_provider')}
              position={SelectField.Positions.BELOW}
              menuItems={this.providerList()}
              itemLabel="selectLabel"
              itemValue="selectLabel"
              value={booking.provider.selectLabel}
              onChange={this.onChangeProvider.bind(this)}
              className="dropdownSelect"
              iconChildren="keyboard_arrow_down"
            />
          </div>
        </FadeInOut>
        <Calendar
          onRef={ref => (this.child = ref)}
          onSlotSelected={this.props.onFinish}
        />
      </div>

    );
  }
}

export default connect(
  mapStateToProps,
  {fetchAvailabilities, setBookingProvider, fetchProviders, setUserTimezone, setBookingTime}
)(translate()(ProviderTimeContent))
