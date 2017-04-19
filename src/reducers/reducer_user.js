import { 
  FETCH_USER, 
  GET_CURRENT_USER, 
  IS_LOGGED_IN,
  LOGIN_AS_GUEST,
  LOGIN_AS_USER,
  IS_REGISTERED_USER,
  FORGOT_PASSWORD_SENT,
  GET_USER_LOCATIONS,
  UPDATED_PASSWORD,
  SET_PASSWORD,
  GET_DEPENDANTS,
  ADD_DEPENDANT
} 
from '../actions/index';

const INITIAL_STATE = { 
  credentials: {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    sendSms: ''
  },
  isLoggedIn: false,
  isUser: null,
  isNewUser: false,
  setNewPassword: false,
  passwordUpdated : false,
  recoverPasswordSent: false,
  userLocations: [],
  dependants: []
};

export default function (state = INITIAL_STATE , action){
  switch(action.type){

    case SET_PASSWORD:
      var credentials = state.credentials;
      credentials.password = action.payload.password;
      
      return { ...state, credentials: credentials }
     ;

    case UPDATED_PASSWORD:
      return { ...state, passwordUpdated: action.payload.passwordUpdated }

    case IS_LOGGED_IN:
      if (action.payload.isLoggedIn){
        return { ...state, isLoggedIn: action.payload.isLoggedIn }
      }else{
        return INITIAL_STATE;
      }      
    
    case GET_CURRENT_USER:
      return state;      
    case IS_REGISTERED_USER:
      var credentials = state.credentials;
      credentials.email = action.payload.email
      
      return {...state, isUser: action.payload.isRegistered, credentials}
    case LOGIN_AS_GUEST:
      return {...state, setNewPassword: true}
    case LOGIN_AS_USER:
      return {...state, isNewUser: false, isUser:true}
    case FORGOT_PASSWORD_SENT:
      return { ...state, recoverPasswordSent: action.payload.sent}
    case GET_USER_LOCATIONS:
      return { ...state, userLocations: action.payload.locations}
    case GET_DEPENDANTS:
      return { ...state, dependants: action.payload.dependants}
    case ADD_DEPENDANT:
      const dependants = state.dependants;
      dependants.push(action.payload.dependant);
      return { ...state, dependants}
    default:
      return state;

  }
}