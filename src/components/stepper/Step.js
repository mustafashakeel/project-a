import React from 'react';
import classNames from 'classnames';
export default class Step extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  getIndicatorClass = () => {
    
    return classNames({
      stepIndicator: true,
      bullet: this.props.completed == false,
      checkmark: this.props.completed == true,
      active: this.props.active == true
    });
  }

  render() {
    return (
      <div style={this.props.style}  className="StepContainer">
        <div className={this.getIndicatorClass()}></div>
        <div className="stepLine"></div>
        {this.props.children}
      
      </div>
    );
  }
}
