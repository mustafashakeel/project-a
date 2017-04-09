import { 
  FETCH_USER, 
  GET_CURRENT_USER, 
  IS_LOGGED_IN,
  LOGIN_AS_GUEST,
  LOGIN_AS_USER,
  IS_REGISTERED_USER
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
  isUser: false,
  isNewUser: false
};

export default function (state = INITIAL_STATE , action){
  switch(action.type){

    case FETCH_USER:
      const credentials = {
        email: action.payload.credentials.email
      }
      return { ...state, credentials: credentials }
     ;

    case IS_LOGGED_IN:
      if (action.payload.isLoggedIn){
        return { ...state, isLoggedIn: action.payload.isLoggedIn }
      }else{
        return INITIAL_STATE;
      }      
    
    case GET_CURRENT_USER:
      return state;      
    case IS_REGISTERED_USER:
      return {...state, isUser: action.payload}
    case LOGIN_AS_GUEST:
      return {...state, isNewUser: true, isUser: false}
    case LOGIN_AS_USER:
      return {...state, isNewUser: false, isUser:true}
    default:
      return state;

  }
}