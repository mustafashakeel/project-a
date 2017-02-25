import React from 'react';
import classNames from 'classnames'
import FontIcon from 'react-md/lib/FontIcons';


export default class ListCategory extends React.Component {

  state = {
    isOpen: false
  }

  getClasses = () => {
    return classNames({
      ServiceMenuCategory: true,
      isActive: this.state.isOpen
    })
  }

  getIcon = () => {
    return (!this.state.isOpen)? "add" : "remove"
  }

  render() {
    return (
      <div className={this.getClasses()} >
        <div className="categoryParent" onClick={() => this.setState({isOpen: !this.state.isOpen})}>
          <span>{this.props.name}</span>
          <FontIcon>{this.getIcon()}</FontIcon>
        </div>
        <div className="categoryChildren">
          {this.props.children}
        </div>
      </div>
    );
  }
}
