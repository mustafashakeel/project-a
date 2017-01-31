import React from 'react';

import CSSModules from 'react-css-modules';
import styles from './booking_button.scss';

@CSSModules(styles, {allowMultiple: true})

export default class BookingButton extends React.Component {

  clickEvent(e){
    alert("Clicked");
  }

  render() {
    return (
      <button onClick={this.clickEvent} styleName="booking-button">Book online!</button>
    );
  }
}
