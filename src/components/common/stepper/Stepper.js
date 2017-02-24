import React from 'react';
import './Stepper.scss';
import classNames from 'classnames';

export default class Stepper extends React.Component {

  render() {
    return (
      <div style={this.props.style} className={
        classNames({
          'StepperContainer': true,
          [this.props.className]: this.props.className && true
        })
      }>
        {this.props.children}
      </div>
    );
  }
}
