import { 
  GET_BIZ_INFO,
  GET_BIZ_SERVICES, 
  GET_BIZ_PROVIDERS,
  GET_AVAILABILITIES
} from '../actions/index';

import business from './mocks/business';
import services from './mocks/services';
// import providers from './mocks/providers';

import { groupOfferingsByCat, getProvidersFromAvailabilities } from '../utils';

const INITIAL_STATE = { 
  info: {},
  services: [],
  providers: [],
  availabilities: {}
};

export default function (state = INITIAL_STATE , action){
  switch(action.type){
    case GET_BIZ_INFO:
      return { ...state , info: business }
    case GET_BIZ_SERVICES:
      return { ...state , services: groupOfferingsByCat(services)}
    case GET_BIZ_PROVIDERS:
      return { ...state , providers: providers}
    case GET_AVAILABILITIES:
      const providers = getProvidersFromAvailabilities(action.payload.data);
      return { ...state , availabilities: action.payload.data, providers: providers}
    default:
      return state;
  }
}