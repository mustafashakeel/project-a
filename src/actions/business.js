import axios from 'axios';
import moment from 'moment';
import store from '../reducers';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { setBookingLocation } from './booking'

export const GET_BIZ_INFO = "GET_BIZ_INFO";
export const GET_BIZ_SERVICES = "GET_BIZ_SERVICES";
export const GET_BIZ_PROVIDERS = "GET_BIZ_PROVIDERS";
export const GET_AVAILABILITIES = "GET_AVAILABILITIES";

const ROOT_URL = "https://private-3f77b9-yocaleapi.apiary-mock.com/v1";
// const MOCK_URL = "http://demo1743653.mockable.io";
const PROD_URL = "http://ydevapi.azurewebsites.net/api/v1.0";


export function fetchBiz(businessId){
  const params = {
    businessId:  businessId
  }
  return dispatch => {
    const request = axios.request({
      url:`${PROD_URL}/business/`, 
      method: 'get',
      params: params
    });

    dispatch(showLoading());
    request
    .then((result) => {
      if (result.data.locations.length == 1){
        dispatch(setBookingLocation(result.data.locations[0]));
      }      
      dispatch(hideLoading());
    });

    return dispatch({
      type: GET_BIZ_INFO,
      payload: request
    })
  };
}

export function fetchLocationServices(businessId, locationId){
  return dispatch => {
    const params = {
      businessId,
      locationId
    };

    const request = axios.request({
      url:`${PROD_URL}/business/offerings/`, 
      method: 'get',
      params: params
    });


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

export function fetchAvailabilities(timezone){
  return (dispatch, getState) => {
    const {booking, business, ui} = getState();
    const params = {
          businessId: business.info.id,
          locationId: booking.location.id,
          providerId: booking.provider.providerId,
          offeringId: booking.service.offeringId,
          numberOfDays: 31,
          startDate: ui.calendarMonth.format('YYYY-MM-DD')
        }
    
    const request = axios.request({
      url:`${PROD_URL}/business/availabilities/`, 
      method: 'get',
      params: params
    });

    const actualTimezone = (booking.userTimezone !== "")? booking.userTimezone : booking.bizTimezone;

    dispatch(showLoading());
    request.then((response) => {
      dispatch({
        type: GET_AVAILABILITIES,
        payload: {
          response,
          timezone: actualTimezone
        }
      })
      dispatch(hideLoading());
    });
  };
}


