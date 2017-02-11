import React from 'react';

import Stepper from '../../stepper/Stepper';
import Step from '../../stepper/Step';
import SelectField from 'react-md/lib/SelectFields';

import './LocationServiceProviderContent.scss';

export default class LocationServiceProviderContent extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="LocationContainer">
        <Stepper activeStep={0}>
          <Step style={{height: "55px"}} completed={false} active={true}>
            <SelectField
              id="selectButtonNumbers"
              placeholder="Select a location"
              position={SelectField.Positions.BELOW}
              menuItems={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
              className="SelectLocation"
              iconChildren="keyboard_arrow_down"
            />
          </Step>
          <Step completed={false}>
            <h4>Choose a service <span>(4 categories)</span></h4>
          </Step>
        </Stepper>
      </div>
    );
  }
}
