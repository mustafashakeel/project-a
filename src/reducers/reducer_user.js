import { FETCH_USER, GET_CURRENT_USER } from '../actions/index';

const INITIAL_STATE = { 
  credentials: {
    email: '',
    password: ''
  },
  isUser: false,
  isNewUser: false
};

export default function (state = INITIAL_STATE , action){
  switch(action.type){

    case FETCH_USER:
      const credentials = {
        email: action.payload.credentials.email
      }
      return { ...state, credentials: credentials, isUser: action.payload.isUser }
     ;
    break;
    case GET_CURRENT_USER:
      return state;      
    break;
    default:
      return state;

  }
}