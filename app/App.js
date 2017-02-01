import React from 'react';
import ReactDOM from 'react-dom';
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 50,
  },
});


import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

import BookingButton from './components/booking_button/BookingButton';

import styles from './App.scss';

class App extends React.Component {

  render() {
    console.log(muiTheme);
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <BookingButton />
      </MuiThemeProvider>  
    )
  }
}

export default App;
