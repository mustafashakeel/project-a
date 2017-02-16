import React from 'react';

import Toolbar from 'react-md/lib/Toolbars';
import './HeaderWidget.scss';

export default class HeaderWidget extends React.Component {

  render() {
    return (
      <Toolbar
        className="headerWidget"
        colored
        title="Appointment Booking"            
      >
        <h3>In 3 easy steps</h3>
      </Toolbar>
    );
  }
}
