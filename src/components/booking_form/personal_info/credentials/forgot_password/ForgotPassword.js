import React from 'react';
import { connect } from 'react-redux';
import { recoverPassword, recoverPasswordSent } from '../../../../../actions/index';

import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields';


function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export class ForgotPassword extends React.Component {

  state = {
    showDialog: false
  };

  openDialog(){
    this.setState({ showDialog: true });
  };

  closeDialog(){
    this.setState({ showDialog: false });
  };

  recoverPassword(){
    this.props.recoverPassword();
  }

  componentWillUnmount() {
      this.props.recoverPasswordSent(false);
  }

  render() {
    return (
      <div className="ForgotPassword">
        <p className="yocaleBlue underline " onClick={this.openDialog.bind(this)}>Forgot password?</p>    
        <Dialog
            id="recoverPasswordDialog"
            visible={this.state.showDialog}
            title="Recover Password"
            onHide={this.closeDialog.bind(this)}
            actions={[{
              onClick: this.closeDialog.bind(this),
              primary: true,
              label: 'Cancel'
            }]}
          >
          <p>We will send you an email with instructions of how to recover your password</p>
          <TextField 
            id="credentialsEmail"
            placeholder="Email *"
            disabled={true}
            onChange={()=> {}}
            value={this.props.user.credentials.email}
            />
            <div className="align-center">
              <button 
                className="yocaleButton"
                onClick={this.recoverPassword.bind(this)}
              >Request</button>
            </div>
        </Dialog>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { recoverPassword, recoverPasswordSent } 
)(ForgotPassword)
