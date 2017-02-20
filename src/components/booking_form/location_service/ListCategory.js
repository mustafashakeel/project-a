import React from 'react';
import classNames from 'classnames'
import FontIcon from 'react-md/lib/FontIcons';


export default class ListCategory extends React.Component {

  getClasses = () => {
    return classNames({
      ServiceMenuCategory: true,
      isActive: this.props.data.isOpen
    })
  }

  getIcon = () => {
    return (!this.props.isOpen)? "add" : "remove"
  }

  render() {
    return (
      <div className={this.getClasses()} key={this.props.id} onClick={this.props.onClick}>
        <span>{this.props.name}</span>
        <FontIcon>{this.getIcon()}</FontIcon>
      </div>
    );
  }
}
