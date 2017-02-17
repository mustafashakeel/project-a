import { combineReducers } from 'redux';
import UIReducer from './reducer_ui';
import UserReducer from './reducer_user';

const rootReducer = combineReducers({
  ui: UIReducer,
  user: UserReducer
});

export default rootReducer;
