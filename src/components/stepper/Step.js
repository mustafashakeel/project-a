import React from 'react';
import classNames from 'classnames';
export default class Step extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  getIndicatorClass = (defaultClass) => {
    
    return classNames({
      [defaultClass]: true,
      uncompleted: this.props.completed == false,
      completed: this.props.completed == true,
      active: this.props.active == true
    });
  }

  render() {
    return (
      <div style={this.props.style}  className="StepContainer">
        {!this.props.noIndicator &&
          <div className={this.getIndicatorClass('stepIndicator')}></div>
        }
        {this.props.stepLine &&
          <div className={this.getIndicatorClass('stepLine')}></div>
        }

        {this.props.children}
      
      </div>
    );
  }
}
