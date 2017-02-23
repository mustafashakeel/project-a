import { SET_BOOKING_TIME } from '../actions/index';

const INITIAL_STATE = { 
  location: null,
  provider: null,
  timestamp: null
};

export default function (state = INITIAL_STATE , action){
  switch(action.type){

    case SET_BOOKING_TIME:
      return { ...state, timestamp: action.payload.timestamp };
    break;
    default:
      return state;
    break;

  }
}