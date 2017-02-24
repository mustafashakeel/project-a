import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {

  };
}

export class MenuServices extends React.Component {
  render() {
    return (
      <div></div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(MenuServices)
