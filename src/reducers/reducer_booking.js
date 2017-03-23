import { 
  SET_BOOKING_TIME,
  SET_BOOKING_STATUS,
  SET_BOOKING_LOCATION,
  SET_BOOKING_SERVICE,
  SET_BOOKING_PROVIDER,
  SET_BOOKING_DEPENDANT,
  SET_PAYMENT_DETAILS,
  SET_REMINDER_OPTS,
  SET_GRANT_TOTAL,
  GET_INTAKE_FORMS,
  SAVE_INTAKE_FORM,
  LEASE_BOOKING,
  IS_LOGGED_IN
} from '../actions/index';

const INITIAL_STATE = {
  bookingId: null,
  lease: null,
  isBooked: false,
  location: {},
  service:{},
  intake_forms: {
    source: [],
    completed: [],
  },
  provider: {},
  timestamp: null,
  dependant: "",
  payment: {},
  grantTotal: 0,
  reminder: {
    enableReminder: false,
    channel: "email",
    phoneNumber: "",
    timeReminder : 10,
    minHourReminder : "Minutes"
  }  
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

    case SET_BOOKING_DEPENDANT:
      return { ...state, dependant: action.payload.dependant };

    case SET_PAYMENT_DETAILS:
      return { ...state, payment: action.payload.token };

    case SET_GRANT_TOTAL:
      return { ...state, grantTotal: action.payload.total } 

    case SET_REMINDER_OPTS:
      const reminder = {...state.reminder}
      reminder[action.payload.key] = action.payload.val;
      return { ...state, reminder: reminder };

    case GET_INTAKE_FORMS:
      var intake_forms = { 
        ...state.intake_forms,
        source: action.payload.data
      }
      return { ...state, intake_forms: intake_forms }

    case SAVE_INTAKE_FORM:
      const newObj = action.payload.formObj;
      const newCompleted = state.intake_forms.completed;
      newCompleted[newObj.id] = newObj.data;

      var intake_forms = {
        ...state.intake_forms,
        completed: newCompleted
      }

      return { ...state, intake_forms: intake_forms }

    case LEASE_BOOKING:
      return { ...state, lease: action.payload.data}

    case IS_LOGGED_IN:
      // from users action
      if (action.payload.isLoggedIn == false){
        return { ...state, lease: null}
      }

    default:
      return state;

  }
}