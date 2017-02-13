import React from 'react';

import FontIcon from 'react-md/lib/FontIcons';

// const icon = <FontIcon style={{display:"none"}}>{this.props.icon}</FontIcon>;

export default class TabHeader extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="TabHeader" onClick={this.props.onClick}>
        <FontIcon className="TabHeaderIcon">{this.props.icon}</FontIcon>
        <div className="TabHeaderLabel">{this.props.label}</div>
      </div>
    );
  }
}
