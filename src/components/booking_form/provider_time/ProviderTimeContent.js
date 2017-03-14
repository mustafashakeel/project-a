import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { fetchAvailabilities, setBookingProvider } from '../../../actions/index';

import Calendar from './calendar/Calendar'

import SelectField from 'react-md/lib/SelectFields';
import Avatar from 'react-md/lib/Avatars';

import './ProviderTimeContent.scss';

function mapStateToProps(state) {
  return {
    providers: state.business.providers,
    provider: state.booking.provider
  };
}

export class ProviderTimeContent extends React.Component {

  onChangeProvider = (newValue, newValueIndex) => {
    this.props.setBookingProvider(this.props.providers[newValueIndex]);
  }

  providerList = () => {
    return this.props.providers.map((provider, index) => {
      return {
        ...provider,
        leftAvatar: <Avatar src={provider.User.Pictures[0].PictureFileName} alt={provider.fullName}  />
      }
    });
  }



  componentWillMount() {
    this.props.fetchAvailabilities();
  }

  render() {
    const { t } = this.props;
    return (
      <div className="ProviderTimeContent">
        <SelectField
          id="selectProvider"
          placeholder={t('application.provider_time.select_provider')}
          position={SelectField.Positions.BELOW}
          menuItems={this.providerList()}
          itemLabel="fullName"
          itemValue="fullName"
          value={this.props.provider.fullName}
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
  {fetchAvailabilities, setBookingProvider}
)(translate()(ProviderTimeContent))
