import React from 'react';
import classNames from 'classnames';
import FontIcon from 'react-md/lib/FontIcons';

export default class TabHeader extends React.Component {

  getTabHeaderClass = () => {
    return classNames({
      "TabHeader": true,
      "active": this.props.active
    })
  }

  getIconClass = () => {
    return classNames({
      "TabHeaderIcon": true,
      "middle": this.props.isCenter
    })
  }

  render() {
    return (
      <div className={this.getTabHeaderClass()} onClick={this.props.onClick}>
        <FontIcon className={this.getIconClass()}>
          {this.props.icon}
        </FontIcon>
        <div className="TabHeaderLabel">
          <span>{this.props.label}</span>
          <span>{this.props.label2}</span>
        </div>
      </div>
    );
  }
}

TabHeader.defaultProps = {
  label: "",
  label2: ""
}