import { 
  FETCH_USER, 
  GET_CURRENT_USER, 
  IS_LOGGED_IN,
  LOGIN_AS_GUEST,
  LOGIN_AS_USER,
  IS_REGISTERED_USER,
  FORGOT_PASSWORD_SENT,
  GET_USER_LOCATIONS
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
  recoverPasswordSent: false,
  userLocations: []
};

export default function (state = INITIAL_STATE , action){
  switch(action.type){

    // case FETCH_USER:
    //   let credentials = {
    //     email: action.payload.credentials.email
    //   }
    //   return { ...state, credentials: credentials }
    //  ;

    case IS_LOGGED_IN:
      if (action.payload.isLoggedIn){
        return { ...state, isLoggedIn: action.payload.isLoggedIn }
      }else{
        return INITIAL_STATE;
      }      
    
    case GET_CURRENT_USER:
      return state;      
    case IS_REGISTERED_USER:
      const credentials = state.credentials;
      credentials.email = action.payload.email
      
      return {...state, isUser: action.payload.isRegistered, credentials}
    case LOGIN_AS_GUEST:
      return {...state, isNewUser: true, isUser: false}
    case LOGIN_AS_USER:
      return {...state, isNewUser: false, isUser:true}
    case FORGOT_PASSWORD_SENT:
      return { ...state, recoverPasswordSent: action.payload.sent}
    case GET_USER_LOCATIONS:
      return { ...state, userLocations: JSON.parse(action.payload.locations)}
    default:
      return state;

  }
}