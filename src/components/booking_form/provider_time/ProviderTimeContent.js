import React from 'react';
import { connect } from 'react-redux';

import Calendar from './Calendar'

import SelectField from 'react-md/lib/SelectFields';

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
    // this.props.onFinish();
  }
  render() {
    return (
      <div className="ProviderTimeContent">
        <SelectField
          id="selectProvider"
          placeholder="Select a provider"
          position={SelectField.Positions.BELOW}
          menuItems={['Any Provider', 'Kate Hudson', 'Jennifer Smith', 'Brian Roberts']}
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
)(ProviderTimeContent)
