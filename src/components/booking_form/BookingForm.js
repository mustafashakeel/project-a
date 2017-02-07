import React from 'react';

import CSSModules from 'react-css-modules';
import styles from './BookingForm.scss';
import widgetSettings from '../../widgetSettings';

@CSSModules(styles, {allowMultiple: true})

export default class BookingForm extends React.Component {

  constructor(props) {
    super(props);
    
    this.settings = widgetSettings.getValue();
  }

  render() {
    return (
        <div styleName="booking-form">
          <h1>Yocale Widget</h1>
          <p>Business ID: <strong>{this.settings.businessID}</strong></p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
    );
  }
}
