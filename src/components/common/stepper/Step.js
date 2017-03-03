import React from 'react';
import classNames from 'classnames';
import FontIcon from 'react-md/lib/FontIcons';

export default class Step extends React.Component {

  getClassNames = (defaultClass) => {
    
    return classNames({
      [this.props.className]: this.props.className && true,
      [defaultClass]: true,
      uncompleted: !this.props.completed,
      completed: this.props.completed,
      active: this.props.active && !this.props.completed
    });
  }

  render() {
    return (
      <div style={this.props.style}  className={this.getClassNames('StepContainer')}>
        {!this.props.noIndicator &&
          <div className={this.getClassNames('stepIndicator')}>
            {this.props.completed &&
              <FontIcon>check</FontIcon>
            }
          </div>
        }
        {this.props.stepLine &&
          <div className={this.getClassNames('stepLine')}></div>
        }

        {this.props.children}
      
      </div>
    );
  }
}

Step.defaultProps = {
  uncompleted: false,
  completed: false,
  active: false
}