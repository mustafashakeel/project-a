import React from 'react';
import classNames from 'classnames';
import FontIcon from 'react-md/lib/FontIcons';

export default class TabHeader extends React.Component {

  getIconClass = () => {
    return classNames({
      "TabHeaderIcon": true,
      "middle": this.props.isCenter
    })
  }

  render() {
    return (
      <div className="TabHeader" onClick={this.props.onClick}>
        <FontIcon className={this.getIconClass()}>
          {this.props.icon}
        </FontIcon>
        <div className="TabHeaderLabel">{this.props.label}</div>
      </div>
    );
  }
}
