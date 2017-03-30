import { 
  GET_BIZ_INFO,
  GET_BIZ_SERVICES, 
  GET_BIZ_PROVIDERS,
  GET_AVAILABILITIES
} from '../actions/index';

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

      return { ...state , info: action.payload.data }
    case GET_BIZ_SERVICES:
      return { ...state , services: groupOfferingsByCat(action.payload.data)}
    case GET_BIZ_PROVIDERS:
      return { ...state , providers: action.payload.data }
    case GET_AVAILABILITIES:
      return { ...state , availabilities: action.payload.data}
    default:
      return state;
  }
}