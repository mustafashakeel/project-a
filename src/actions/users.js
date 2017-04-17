import axios from 'axios';
import najax from 'najax';
import cookie from 'react-cookie';

import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { leaseBooking } from './booking';
import { addErrorMsg } from './ui';

export const UPDATE_USER_CREDENTIALS = 'UPDATE_USER_CREDENTIALS';
export const FETCH_USER = 'FETCH_USER';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const IS_LOGGED_IN  = 'IS_LOGGED_IN';
export const LOGIN_AS_GUEST = 'LOGIN_AS_GUEST';
export const LOGIN_AS_USER = 'LOGIN_AS_USER';
export const IS_REGISTERED_USER = 'IS_REGISTERED_USER';
export const FORGOT_PASSWORD_SENT = 'FORGOT_PASSWORD_SENT';
export const GET_USER_LOCATIONS = 'GET_USER_LOCATIONS';
export const UPDATED_PASSWORD = 'UPDATED_PASSWORD';
export const SET_PASSWORD = 'SET_PASSWORD';


const ROOT_URL = "https://private-3f77b9-yocaleapi.apiary-mock.com/v1";
const PROD_URL = "http://ydevapi.azurewebsites.net/api/v1.0";

// const ROOT_URL = "http://ydevapi.azurewebsites.net/api/v1.0";

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
  return dispatch => {
    const request = axios.request({
      url: `${PROD_URL}/account/accountType`,
      method: 'get',
      params: { email: email }
    });
    dispatch(showLoading());
    request.then((response) => {
      dispatch(hideLoading());
      if ( response.data.accountType === 'Yocale'){
        dispatch({
            type: IS_REGISTERED_USER,
            payload: {
              email: email,
              isRegistered: true
            }
        });
      }else{
        dispatch({
            type: IS_REGISTERED_USER,
            payload: {
              email: email,
              isRegistered: false
            }
        });
      }
    })
    .catch((error) => {
      dispatch({
          type: IS_REGISTERED_USER,
          payload: {
            email: email,
            isRegistered: false
          }
      });
      dispatch(hideLoading());
    });  

  };
}

export function isLoggedIn(flag){

  if (!flag){
    cookie.remove('access_token');
  }
  
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

export function signupUser(user){
  const values = {
    email: user.email.value,
    password: user.password.value,
    firstName: user.firstName.value,
    lastName: user.lastName.value,
    phone: user.phoneNumber.value
  };

  return dispatch => {
    const request = axios.post(`${PROD_URL}/account/register/`, values);
    dispatch(showLoading());
    request
    .then(() =>{
      dispatch(leaseBooking());
    })
    .error((error) => {
      dispatch(hideLoading());
      dispatch(addErrorMsg(error.message));
    });
  };
}

export function loginUser(fields){  

  return (dispatch, getState) => {
    const { booking } = getState();
    const data = {
      client_id: "0b531646fc4849309332e06670be0357",
      client_secret: "rzx2bLL-BWV9tB4BqjeJBWfazEouLBsW6NqVS8ixX-Y",
      grant_type: "password",
      username: fields.email.value,
      password: fields.password.value
    }
    

    const request = najax({
        url: "https://ydevauth.azurewebsites.net/oauth/token",
        contentType: "application/x-www-form-urlencoded",
        type: "POST",
        data: data,
        dataType: "json"
    });

    dispatch(showLoading());
    request.success((response) =>{
      if (response.access_token){
        cookie.save('access_token', response.access_token);
        dispatch({ 
          type: LOGIN_AS_USER
        });
        if (booking.allowConfirmedBooking){
          dispatch(leaseBooking());
        }else{
          dispatch(isLoggedIn(true));
          dispatch(hideLoading());
        }
      }else {
        dispatch(addErrorMsg("Invalid user or password", "Retry"));
      }
      
    }).
    error((error) => {
      dispatch(hideLoading());
      dispatch(addErrorMsg("Invalid user or password", "Retry"));
    })
  };
}

export function loginAsGuest(fields){
  return dispatch => {

    const data = {
      email: fields.email.value,
      firstName: fields.firstName.value,
      lastName: fields.lastName.value,
      phone: fields.phoneNumber.value
    };
    
    const request = najax({
        url: `${PROD_URL}/account/registerGuest`,
        contentType: "application/x-www-form-urlencoded",
        type: "POST",
        data: data,
        dataType: "json"
    });

    dispatch(showLoading());
    request.success((response) =>{
      if (response.password){
        const loginData = {
          email: fields.email,
          password: {
            value: response.password          
          }
        };

        dispatch(loginUser(loginData)) ;
        dispatch({ type: LOGIN_AS_GUEST });
        dispatch({ type: SET_PASSWORD, payload: { password: response.password} });
      }
    }).
    error((error) => {
      dispatch(hideLoading());
      dispatch(addErrorMsg(error.message, "Retry"));
    })

    
  };
}

export function recoverPasswordSent(sent){
  return {
    type: FORGOT_PASSWORD_SENT,
    payload: {
      sent:sent
    }
  } 
}

export function getUserLocations(){
  return (dispatch) => {
    let headers = {};
    if (cookie && cookie.load('access_token')) {
       headers = {
        'Authorization': `Bearer  ${cookie.load('access_token')}`
      }
    }
    const request = najax({
      url:`${PROD_URL}/booking/customerOnsiteLocations`,
      type: 'get',
      headers
    });

    // dispatch(showLoading());
    request
    .success((response) =>{
      dispatch({
        type: GET_USER_LOCATIONS,
        payload: {
          locations: response
        }
      });
    })
    .error((error) => {
      // dispatch(hideLoading());
      dispatch(addErrorMsg(error.message || 'There was an error'));
    });
  };
}

export function updateUserPassword(password){
  return (dispatch, getState) => {
    let headers = {};
    if (cookie && cookie.load('access_token')) {
       headers = {
        'Authorization': `Bearer  ${cookie.load('access_token')}`
      }
    }

    const { user } = getState();

    const request = najax({
      url:`${PROD_URL}/account/changePassword/`,
      type: 'post',
      data: {
        oldPassword: user.credentials.password,
        newPassword: password
      },
      headers
    });

    dispatch(showLoading());
    request
    .success((response) =>{
      dispatch({
        type: UPDATED_PASSWORD,
        payload: {
          passwordUpdated: true
        }
      });
    })
    .error((error) => {
      const response = JSON.parse(error.responseText);
      dispatch(hideLoading());
      dispatch(addErrorMsg(response.message, "Retry"));
    });
  };
}




