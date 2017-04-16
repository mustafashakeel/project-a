import _ from 'lodash';
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
  SET_PAYMENT_STATUS,  
  SAVE_INTAKE_FORM,
  LEASE_BOOKING,
  IS_LOGGED_IN,
  BOOK_APPOINTMENT,
  SET_BIZ_TIMEZONE,
  SET_USER_TIMEZONE,
  SET_USER_LOCATION,
  ALLOW_CONFIRMED_BOOKING
} from '../actions/index';

const INITIAL_STATE = {
  lease: null,
  isBooked: false,
  isPaid: false,
  booked_summary: { status: 0},
  location: {},
  service:{},
  intake_forms: {
    source: [],
    completed: [],
  },
  provider: { providerId: null },
  timestamp: null,
  providersInSlot: null,
  dependant: "",
  payment: {},
  grantTotal: 0,
  reminder: {
    enableReminder: false,
    channel: "email",
    phoneNumber: "",
    timeReminder : 10,
    minHourReminder : "Minutes"
  },
  bizTimezone: '',
  userTimezone: '',
  clientLocation: {
    fullAddress: "",
    latitude: "",
    longitude: ""
  },
  allowConfirmedBooking: null
};

export default function (state = INITIAL_STATE , action){
  switch(action.type){

    case SET_BOOKING_TIME:
      return { ...state, timestamp: action.payload.timestamp, providersInSlot: action.payload.providers };

    case SET_BOOKING_STATUS:
      return { ...state, isBooked: action.payload.booked };

    case SET_PAYMENT_STATUS:
      return { ...state, isPaid: action.payload.isPaid };      

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

    case SAVE_INTAKE_FORM:
      const newObj = action.payload.formObj;
      const intake_forms = state.intake_forms;

      _.remove(intake_forms.completed, function(form) {
        return form.id == newObj.id;
      });
      intake_forms.completed.push({
        id: newObj.id,
        formName: newObj.formName,
        formData: newObj.data
      })

      return { ...state, intake_forms: intake_forms }

    case LEASE_BOOKING:
      var intake_forms = { 
        ...state.intake_forms,
        source: action.payload.data.clientForms
      }
      return { ...state, lease: action.payload.data, intake_forms: intake_forms}

    case BOOK_APPOINTMENT:
      return { ...state, booked_summary: action.payload}

    case IS_LOGGED_IN:
      // from users action
      if (action.payload.isLoggedIn == false){
        return { ...state, lease: null}
      }
    case SET_BIZ_TIMEZONE:
      return { ...state, bizTimezone: action.payload.bizTimezone}

    case SET_USER_TIMEZONE:
      return { ...state, userTimezone: action.payload.userTimezone}

    case SET_USER_LOCATION:
      return { ...state, clientLocation: action.payload.location}

    case ALLOW_CONFIRMED_BOOKING:
      return { ...state, allowConfirmedBooking: action.payload.allowConfirmedBooking}

    default:
      return state;

  }
}