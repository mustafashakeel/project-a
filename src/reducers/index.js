import { combineReducers } from 'redux';
import UIReducer from './reducer_ui';
import UserReducer from './reducer_user';
import BookingReducer from './reducer_booking';
import BusinessReducer from './reducer_business';

// import { loadingBarReducer } from 'react-redux-loading-bar'

const rootReducer = combineReducers({
  // loadingBar: loadingBarReducer,
  ui: UIReducer,
  user: UserReducer,
  booking: BookingReducer,
  business: BusinessReducer
});

export default rootReducer;
