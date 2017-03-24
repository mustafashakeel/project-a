import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { leaseBooking } from './booking';

export const UPDATE_USER_CREDENTIALS = 'UPDATE_USER_CREDENTIALS';
export const FETCH_USER = 'FETCH_USER';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const IS_LOGGED_IN  = 'IS_LOGGED_IN';

const ROOT_URL = "https://private-3f77b9-yocaleapi.apiary-mock.com/v1";

export function fetchUser(email){  

  let isUser = false;
  switch(email){
    case "user@yocale.com":
      isUser = true;
    break;
   default:break;
  }

  return {
    type: FETCH_USER,
    payload: {
      credentials : {
        email: email
      },
      isUser: isUser
    }
  };

}

export function isLoggedIn(flag){
  
  return {
    type: IS_LOGGED_IN,
    payload: {
      isLoggedIn: flag
    }
  }
}

export function getCurrentUser(){
  return {
    type: GET_CURRENT_USER,
    payload: {}
  }
}

export function signupUser(fields, booking){
  const values = {
    email: fields.email.value,
    password: fields.password.value,
    firstName: fields.firstName.value,
    lastName: fields.lastName.value,
    phone: fields.phoneNumber.value
  };


  return dispatch => {
    const request = axios.post(`${ROOT_URL}/account/register/`, values);
    dispatch(showLoading());
    request.then(() =>{
      dispatch(leaseBooking(booking)).then(() => {
        dispatch(hideLoading());
      });
    });
  };
}

export function loginUser(fields, booking){
  const values = {
    email: fields.email.value,
    password: fields.password.value,
    firstName: fields.firstName.value,
    lastName: fields.lastName.value,
    phone: fields.phoneNumber.value
  };

  return dispatch => {
    const request = axios.post(`${ROOT_URL}/account/register/`, values);
    dispatch(showLoading());
    request.then(() =>{
      dispatch(leaseBooking(booking)).then(() => {
        dispatch(hideLoading());
      });
    });
  };
}

export function loginAsGuest(booking){
  return dispatch => {
    dispatch(leaseBooking(booking));
  };
}

