import React, {Component} from 'react';

import widgetSettings from '../../widgetSettings';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Iframe from 'react-iframe';

import CSSModules from 'react-css-modules';
import styles from './BookingButton.scss';

@CSSModules(styles, {allowMultiple: true})

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

    const bookingClass = this.props.styles["booking-button"];
    const posClass = this.props.styles[this.settings.position];
    return bookingClass + " " + posClass;
  }

  renderButton() {
    // console.log(this.positionClass());
    if (!this.state.open) {
      return (
        <RaisedButton  onClick={this.handleOpen} label="Book an appointment" backgroundColor="#F44336" className={this.positionClass()}/>
      )
    }else {
      return (
        <RaisedButton onClick={this.handleClose} label="Close" backgroundColor="#F44336" className={this.positionClass()}/>
      )
    }
  }

  render() {

    return (
      <div>
        { this.renderButton() }
        <Dialog
          className={ this.props.styles.hiddenoverlay }
          contentClassName={this.props.styles.bookingContainer}
          bodyClassName={this.props.styles.bookingContainer}
          modal={false} 
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <Iframe styleName="booking-iframe" url="http://localhost:3000/form" height="500" width="325"/>

        </Dialog>

      </div>
    );
  }
}

export default BookingButton;
