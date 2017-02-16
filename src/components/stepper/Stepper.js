import React from 'react';
import './Stepper.scss';

export default class Stepper extends React.Component {

  render() {
    return (
      <div style={this.props.style} className="StepperContainer">
        {this.props.children}
      </div>
    );
  }
}
