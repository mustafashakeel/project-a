import { 
  SET_BOOKING_TIME,
  SET_BOOKING_STATUS,
  SET_BOOKING_LOCATION,
  SET_BOOKING_SERVICE,
  SET_BOOKING_PROVIDER
} from '../actions/index';

const INITIAL_STATE = {
  isBooked: false, 
  location: {},
  service:{},
  provider: {},
  timestamp: null
};

export default function (state = INITIAL_STATE , action){
  switch(action.type){

    case SET_BOOKING_TIME:
      return { ...state, timestamp: action.payload.timestamp };
    case SET_BOOKING_STATUS:
      return { ...state, isBooked: action.payload.booked };
    case SET_BOOKING_LOCATION:
      return { ...state, location: action.payload.location };
    case SET_BOOKING_SERVICE:
      return { ...state, service: action.payload.service };
    case SET_BOOKING_PROVIDER:
      return { ...state, provider: action.payload.provider };
    default:
      return state;

  }
}