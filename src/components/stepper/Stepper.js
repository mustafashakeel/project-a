import React from 'react';
import './Stepper.scss';

export default class Stepper extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={this.props.style} className="StepperContainer">
        {this.props.children}
      </div>
    );
  }
}
