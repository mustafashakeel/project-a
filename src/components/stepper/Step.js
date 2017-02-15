import React from 'react';
import classNames from 'classnames';
import FontIcon from 'react-md/lib/FontIcons';

export default class Step extends React.Component {

  getClassNames = (defaultClass) => {
    
    return classNames({
      [defaultClass]: true,
      uncompleted: this.props.completed == false,
      completed: this.props.completed == true,
      active: this.props.active == true
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
