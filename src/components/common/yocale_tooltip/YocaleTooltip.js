import React from 'react';
import { connect } from 'react-redux';
import {toggleTooltip } from '../../../actions/index';

function mapStateToProps(state) {
  return {
    toolTip: state.ui.toolTip
  };
}

class yocaleTooltip extends React.Component {

  renderChildren() {
    return React.cloneElement(this.props.children, this.props );
  }

  render() {
    return (
      <div>
      {this.props.toolTip && this.props.toolTip.shown &&
        this.renderChildren()
      }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
 {toggleTooltip}
)(yocaleTooltip)

