import {
  GET_BIZ_INFO,
  GET_BIZ_SERVICES,
  GET_BIZ_PROVIDERS,
  GET_AVAILABILITIES
} from '../actions/index';

import {parseAvailabilities} from '../utils'
import moment from 'moment';

import { groupOfferingsByCat, getProvidersFromAvailabilities } from '../utils';

const INITIAL_STATE = {
  info: {},
  services: [],
  providers: [],
  availabilities: []
};

export default function (state = INITIAL_STATE , action){
  switch(action.type){
    case GET_BIZ_INFO:

      return { ...state , info: action.payload.data }
    case GET_BIZ_SERVICES:
      return { ...state , services: groupOfferingsByCat(action.payload.data)}
    case GET_BIZ_PROVIDERS:
      const providers = action.payload.data;
      const anyProvider = {
        providerId: '',
        selectLabel: 'Any Provider',
        fullName: 'Any Provider'
      }
      providers.map((provider)=>{

         if (!(provider.nextAvailableTime === "N/A")) {
            provider.nextAvailableTime = moment(provider.nextAvailableTime, "YYYY-MM-DD HH:mm PM").format('MMM Do');
          }

         provider.selectLabel = provider.fullName + " - Available: " + provider.nextAvailableTime;

      })
      providers.push(anyProvider);
      return { ...state , providers }
    case GET_AVAILABILITIES:
      return { ...state , availabilities: parseAvailabilities(action.payload.response.data)}
    default:
      return state;
  }
}
