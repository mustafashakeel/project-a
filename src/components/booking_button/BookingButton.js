import React, {Component} from 'react';
import widgetSettings from '../../widgetSettings';

import Button from 'react-md/lib/Buttons/Button';
import Dialog from 'react-md/lib/Dialogs';
import Iframe from 'react-iframe';
import './BookingButton.scss';


class BookingButton extends Component {

  state = {
    open: false
  };

  constructor(props) {
    super(props);
    
    this.settings = widgetSettings.getValue();
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  positionClass = () => {
    return "booking-button " + this.settings.position;
  }

  renderButton() {
    // console.log(this.positionClass());
    if (!this.state.open) {
      return (
        <Button raised onClick={this.handleOpen} label="Book an appointment" className={this.positionClass()}/>
      )
    }else {
      return (
        <Button raised onClick={this.handleClose} label="Close"  className={this.positionClass()}/>
      )
    }
  }

  render() {

    return (
      <div>
        { this.renderButton() }
        <Dialog
          id="widgetDialog"          
          visible={this.state.open}
          onHide={this.handleClose}
          focusOnMount={false}
          contentClassName="bookingContainer"
        >
          <Iframe styleName="booking-iframe" url="http://localhost:3000/form" />

        </Dialog>

      </div>
    );
  }
}

export default BookingButton;
