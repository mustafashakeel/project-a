import { FETCH_USER } from '../actions/index';

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

      // const isUser = {

      // }
      return { ...state, credentials: credentials, isUser: action.payload.isUser }
     ;
    break;
    default:
      return state;

  }
}