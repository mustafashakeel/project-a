import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const GET_BIZ_INFO = "GET_BIZ_INFO";
export const GET_BIZ_SERVICES = "GET_BIZ_SERVICES";
export const GET_BIZ_PROVIDERS = "GET_BIZ_PROVIDERS";
export const GET_AVAILABILITIES = "GET_AVAILABILITIES";

// const ROOT_URL = "https://private-anon-669ba16fad-yocaleapi.apiary-mock.com/v1";
const MOCK_URL = "http://demo1743653.mockable.io";

export function fetchBiz(bizId){
  const request = axios.get(`${MOCK_URL}/availability`);

  return dispatch => {
    dispatch(showLoading());
    return dispatch({
      type: GET_BIZ_INFO,
      payload: request
    })
    .then(() => {
      dispatch(hideLoading());
    });
  }
}

export function fetchLocationServices(locationId){
  const request = axios.get(`${MOCK_URL}/availability`);
  return {
    type: GET_BIZ_SERVICES,
    payload: request
  }
}

export function fetchProviders(businessId, locationId){
  const request = axios.get(`${MOCK_URL}/availability`);
  return {
    type: GET_BIZ_PROVIDERS,
    payload: request
  }
}

export function fetchAvailabilities(businessId, locationId){
  const request = axios.get(`${MOCK_URL}/availability`);
  
  return dispatch => {
    dispatch(showLoading());
    return dispatch({
      type: GET_AVAILABILITIES,
      payload: request
    })
    .then(() => {
      dispatch(hideLoading());
    });
  }
}


