import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

import BookingButton from './components/booking_button/BookingButton';

import styles from './App.scss';

class App extends React.Component {

  render() {
    return (
      <MuiThemeProvider>
        <BookingButton />
      </MuiThemeProvider>  
    )
  }
}

export default App;
