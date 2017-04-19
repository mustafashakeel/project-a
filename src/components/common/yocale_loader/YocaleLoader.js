import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames'

import './YocaleLoader.scss'
function mapStateToProps(state) {
  return {
    showLoader: state.ui.loading
  };
}

export class YocaleLoader extends React.Component {
  render() {
    return (
      <div className={
        classNames({
          "YocaleLoader": true,
          "shown": this.props.showLoader
        })
      }>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(YocaleLoader)
