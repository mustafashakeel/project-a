import { combineReducers } from 'redux';
import UIReducer from './reducer_ui';
import UserReducer from './reducer_user';
import BookingReducer from './reducer_booking';

const rootReducer = combineReducers({
  ui: UIReducer,
  user: UserReducer,
  booking: BookingReducer
});

export default rootReducer;
