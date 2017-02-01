import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import CSSModules from 'react-css-modules';
import styles from './BookingButton.scss';

@CSSModules(styles, {allowMultiple: true})

class BookingButton extends Component {

  state = {
    open: false
  };

  constructor(props) {
    super(props);
    console.log(props);

    // this.handleOpen.bind(this);
    // this.handleClose.bind(this);
  }
    

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  render() {
    console.log(this.props.styles);

    const style = {
      // transform: 'translate(0px, 0px)'
    }
    return (
      <div>
        <RaisedButton className={this.state.open ? this.props.styles.hidden : ''} onClick={this.handleOpen} label="Book an appointment" backgroundColor="#F44336" styleName="booking-button"/>
        <Dialog
          className={ this.props.styles.hiddenoverlay }
          contentStyle={style}
          modal={false} 
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Dialog>
        <RaisedButton className={!this.state.open ? this.props.styles.hidden : ''} onClick={this.handleClose} label="Close" backgroundColor="#F44336" styleName="booking-button"/>

      </div>
    );
  }
}

export default BookingButton;




