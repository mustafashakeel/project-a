import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import CSSModules from 'react-css-modules';
import styles from './BookingButton.scss';

@CSSModules(styles, {allowMultiple: true})

export default class BookingButton extends React.Component {

  clickEvent(e){
    console.log("Clicked");
  }

  render() {
    return (
      <RaisedButton onClick={this.clickEvent} label="Book an appointment" backgroundColor="#F44336" styleName="booking-button"/>
    );
  }
}





