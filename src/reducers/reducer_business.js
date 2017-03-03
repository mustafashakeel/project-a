import { GET_BIZ_INFO, GET_BIZ_SERVICES} from '../actions/index';
import business from './mocks/business';
import services from './mocks/services';

const INITIAL_STATE = { 
  info: {},
  services: [] 
};

export default function (state = INITIAL_STATE , action){
  switch(action.type){
    case GET_BIZ_INFO:
      return { ...state , info: business }
    case GET_BIZ_SERVICES:
      return { ...state , services: services}
    default:
      return state;
  }
}