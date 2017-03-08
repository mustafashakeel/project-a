import axios from 'axios';

export const GET_BIZ_INFO = "GET_BIZ_INFO";
export const GET_BIZ_SERVICES = "GET_BIZ_SERVICES";
export const GET_BIZ_PROVIDERS = "GET_BIZ_PROVIDERS";

const ROOT_URL = "https://private-anon-669ba16fad-yocaleapi.apiary-mock.com/v1";

export function fetchBiz(bizId){
  const request = axios.get(`${ROOT_URL}/business/:businessId`,{
    headers: {
        'Content-Type': 'application/json'
    }
  });

  return {
    type: GET_BIZ_INFO,
    payload: request
  }
}

export function fetchLocationServices(locationId){
  const request = axios.get(`${ROOT_URL}/offerings/:businessId/:locationId`,{
    headers: {
        'Content-Type': 'application/json'
    }
  });

  return {
    type: GET_BIZ_SERVICES,
    payload: request
  }
}

export function fetchProviders(businessId, locationId){
  const request = axios.get(`${ROOT_URL}/offerings/:businessId/:locationId`,{
    headers: {
        'Content-Type': 'application/json'
    }
  });

  return {
    type: GET_BIZ_PROVIDERS,
    payload: request
  }
}