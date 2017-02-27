import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import Calendar from './Calendar'

import SelectField from 'react-md/lib/SelectFields';
import Avatar from 'react-md/lib/Avatars';

import './ProviderTimeContent.scss';

function mapStateToProps(state) {
  return {

  };
}

export class ProviderTimeContent extends React.Component {

  state = {
    provider: ''
  }

  onChangeProvider = (newValue) => {
    this.setState({
      provider: newValue
    });
  }

  providerList = () => {
    return [
      {label: "Any Provider", value: "Any Provider"},
      {label: "Kate Hudson", value: "Kate Hudson", leftAvatar: <Avatar src="/img/placeholder_person.png" alt="A description of image 1" />},
      {label: "Jennifer Smith", value: "Jennifer Smith", leftAvatar: <Avatar src="/img/placeholder_person.png" alt="A description of image 1" />},
      {label: "Brian Roberts", value: "Brian Roberts",  leftAvatar: <Avatar src="/img/placeholder_person.png" alt="A description of image 1" />}
    ]
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
          value={this.state.provider}
          onChange={this.onChangeProvider}
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
// Implement map dispatch to props
)(translate()(ProviderTimeContent))
