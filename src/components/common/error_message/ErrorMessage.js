import React from 'react';
import { connect } from 'react-redux';
import {setErrorMsgs } from '../../../actions/index';

import Snackbar from 'react-md/lib/Snackbars';


function mapStateToProps(state) {
  return {
    errorMsgs: state.ui.errorMsgs
  };
}

export class ErrorMessage extends React.Component {

  state = {
    toasts: [],
    autohide: false
  }

  removeToast() {
    const [, ...toasts] = this.props.errorMsgs.toasts;
    this.props.setErrorMsgs(toasts);
  }


  render() {
    return (
      <Snackbar {...this.props.errorMsgs} onDismiss={this.removeToast.bind(this)} />
    );
  }
}

export default connect(
  mapStateToProps,
  { setErrorMsgs }
)(ErrorMessage)
