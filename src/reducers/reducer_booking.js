import { SET_BOOKING_TIME, SET_BOOKING_STATUS } from '../actions/index';

const INITIAL_STATE = {
  isBooked: false, 
  location: null,
  provider: null,
  timestamp: null
};

export default function (state = INITIAL_STATE , action){
  switch(action.type){

    case SET_BOOKING_TIME:
      return { ...state, timestamp: action.payload.timestamp };
    case SET_BOOKING_STATUS:
      console.log(action.payload);
      return { ...state, isBooked: action.payload.booked };
    default:
      return state;

  }
}