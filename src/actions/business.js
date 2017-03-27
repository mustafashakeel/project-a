import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const GET_BIZ_INFO = "GET_BIZ_INFO";
export const GET_BIZ_SERVICES = "GET_BIZ_SERVICES";
export const GET_BIZ_PROVIDERS = "GET_BIZ_PROVIDERS";
export const GET_AVAILABILITIES = "GET_AVAILABILITIES";

const ROOT_URL = "https://private-3f77b9-yocaleapi.apiary-mock.com/v1";
const MOCK_URL = "http://demo1743653.mockable.io";

export function fetchBiz(bizId){
  return dispatch => {
    const request = axios.get(`${ROOT_URL}/business/:businessId`);
    dispatch(showLoading());
    return dispatch({
      type: GET_BIZ_INFO,
      payload: request
    })
    .then(() => {
      dispatch(hideLoading());
    });
  };
}

export function fetchLocationServices(businessId, locationId){
  return dispatch => {
    const request = axios.get(`${ROOT_URL}/offerings/:businessId/:locationId`);
    dispatch(showLoading());
    return dispatch({
      type: GET_BIZ_SERVICES,
      payload: request
    })
    .then(() => {
      dispatch(hideLoading());
    });
  };
}

export function fetchProviders(businessId, locationId, offeringId){
  return dispatch => {
    const request = axios.get(`${ROOT_URL}/business/providers/:businessId/:locationId/:offeringId`);
    dispatch(showLoading());
    return dispatch({
      type: GET_BIZ_PROVIDERS,
      payload: request
    })
    .then(() => {
      dispatch(hideLoading());
    });
  };
}

export function fetchAvailabilities(businessId, locationId){
  
  return dispatch => {
    const request = axios.get(`${MOCK_URL}/availability`);
    dispatch(showLoading());
    return dispatch({
      type: GET_AVAILABILITIES,
      payload: request
    })
    .then(() => {
      dispatch(hideLoading());
    });
  };
}


