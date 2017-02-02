import React, {Component} from 'react';

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

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  renderButton() {
    if (!this.state.open) {
      return (
        <RaisedButton  onClick={this.handleOpen} label="Book an appointment" backgroundColor="#F44336" styleName="booking-button"/>
      )
    }else {
      return (
        <RaisedButton onClick={this.handleClose} label="Close" backgroundColor="#F44336" styleName="booking-button"/>
      )
    }
  }

  render() {
    console.log(this.props.styles);

    const style = {
      // transform: 'translate(0px, 0px)'
    }
    return (
      <div>
        { this.renderButton() }
        <Dialog
          className={ this.props.styles.hiddenoverlay }
          contentStyle={style}
          modal={false} 
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <Iframe url="http://localhost:3000/form" />

        </Dialog>

      </div>
    );
  }
}

export default BookingButton;
