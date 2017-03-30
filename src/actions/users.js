import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { leaseBooking } from './booking';

export const UPDATE_USER_CREDENTIALS = 'UPDATE_USER_CREDENTIALS';
export const FETCH_USER = 'FETCH_USER';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const IS_LOGGED_IN  = 'IS_LOGGED_IN';
export const LOGIN_AS_GUEST = 'LOGIN_AS_GUEST';
export const LOGIN_AS_USER = 'LOGIN_AS_USER';
export const IS_REGISTERED_USER = 'IS_REGISTERED_USER';

const ROOT_URL = "https://private-3f77b9-yocaleapi.apiary-mock.com/v1";

export function fetchUser(email){  

  return {
    type: FETCH_USER,
    payload: {
      credentials : {
        email: email
      }
    }
  };

}

export function userExists(email){
  console.log("fetchingUser");
  return dispatch => {
    const request = axios.get(`${ROOT_URL}/user/account_type/emailAddress`);
    request.then((response) => {
      // if ( response.data.accountType === 'Yocale'){
      if (email === "user@yocale.com") {
        dispatch({
            type: IS_REGISTERED_USER,
            payload: true
        });
      }else{
        dispatch({
            type: IS_REGISTERED_USER,
            payload: false
        });
      }
    });  

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

export function signupUser(user, booking){
  const values = {
    email: user.email.value,
    password: user.password.value,
    firstName: user.firstName.value,
    lastName: user.lastName.value,
    phone: user.phoneNumber.value
  };


  return dispatch => {
    const request = axios.post(`${ROOT_URL}/account/register/`, values);
    dispatch(showLoading());
    request.then(() =>{
      dispatch(leaseBooking(booking));
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
      dispatch({ 
        type: LOGIN_AS_USER
      });
      dispatch(leaseBooking(booking));
    });
  };
}

export function loginAsGuest(booking){
  return dispatch => {
    dispatch({ 
      type: LOGIN_AS_GUEST
    });
    dispatch(leaseBooking(booking));
  };
}

