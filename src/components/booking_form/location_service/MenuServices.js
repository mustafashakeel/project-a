import React from 'react';
import { connect } from 'react-redux';

import './MenuServices.scss';

function mapStateToProps(state) {
  return {

  };
}

export class MenuServices extends React.Component {
  renderParent = () => {
    return this.props.list.map((parent)=>{
      var children = parent.children.map((child) => {
        return React.createElement(this.props.childComponent, {
          ...child,
          key: child.id 
        });
      });
      return React.createElement(this.props.parentComponent, {
        ...parent,
        key: parent.id,
        children
      });
    })
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.renderParent()}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(MenuServices)
