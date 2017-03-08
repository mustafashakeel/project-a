import { GET_BIZ_INFO, GET_BIZ_SERVICES, GET_BIZ_PROVIDERS} from '../actions/index';
import business from './mocks/business';
import services from './mocks/services';
import providers from './mocks/providers';

const INITIAL_STATE = { 
  info: {},
  services: [],
  providers: []
};

export default function (state = INITIAL_STATE , action){
  switch(action.type){
    case GET_BIZ_INFO:
      return { ...state , info: business }
    case GET_BIZ_SERVICES:
      return { ...state , services: services}
    case GET_BIZ_PROVIDERS:
      return { ...state , providers: providers}
    default:
      return state;
  }
}