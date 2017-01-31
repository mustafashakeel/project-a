import React from 'react';
import ReactDOM from 'react-dom';

import BookingButton from './components/booking_button/booking_button'

import styles from './App.scss';

class App extends React.Component {

  render() {
    const { children } = this.props;

    return (
      <BookingButton />
    )
  }
}

export default App;
