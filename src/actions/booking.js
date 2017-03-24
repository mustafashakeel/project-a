import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const SET_BOOKING_TIME = 'SET_BOOKING_TIME';
export const SET_BOOKING_STATUS = 'SET_BOOKING_STATUS';
export const SET_BOOKING_LOCATION = 'SET_BOOKING_LOCATION';
export const SET_BOOKING_SERVICE = 'SET_BOOKING_SERVICE';
export const SET_BOOKING_PROVIDER = 'SET_BOOKING_PROVIDER';
export const SET_BOOKING_DEPENDANT = 'SET_BOOKING_DEPENDANT';
export const SET_PAYMENT_DETAILS = 'SET_PAYMENT_DETAILS';
export const SET_REMINDER_OPTS = 'SET_REMINDER_OPTS';
export const SET_GRANT_TOTAL = 'SET_GRANT_TOTAL';
export const SET_PAYMENT_STATUS = 'SET_PAYMENT_STATUS';

export const GET_INTAKE_FORMS = 'GET_INTAKE_FORMS';
export const SAVE_INTAKE_FORM = 'SAVE_INTAKE_FORM';
export const LEASE_BOOKING = 'LEASE_BOOKING';
export const BOOK_APPOINTMENT = 'BOOK_APPOINTMENT';
export const TEST_ACTION = 'TEST_ACTION';

const ROOT_URL = "https://private-3f77b9-yocaleapi.apiary-mock.com/v1";

export function setBookingTime(timestamp){
  return {
    type: SET_BOOKING_TIME,
    payload: {
      timestamp: timestamp
    }
  }
}

export function appointmentBooked(flag){
  return {
    type: SET_BOOKING_STATUS,
    payload: {
      booked: flag
    }
  }
}

export function setBookingLocation(locationObj){
  return {
    type: SET_BOOKING_LOCATION,
    payload: {
      location: locationObj
    }
  }
}

export function setBookingService(serviceObj){
  return {
    type: SET_BOOKING_SERVICE,
    payload: {
      service: serviceObj
    }
  }
}

export function setBookingProvider(providerObj){
  return {
    type: SET_BOOKING_PROVIDER,
    payload: {
      provider: providerObj
    }
  }
}

export function setBookingDependant(dependant){
  return {
    type: SET_BOOKING_DEPENDANT,
    payload: {
      dependant: dependant
    }
  }
}

export function setPaymentsDetails(result){
  return {
    type: SET_PAYMENT_DETAILS,
    payload: {
      token: result.token
    }
  }
}

export function setReminderOpts(key, val){
  return {
    type: SET_REMINDER_OPTS,
    payload: {
      key: key,
      val: val
    }
  }
}

export function setGrantTotal(total){
  return {
    type: SET_GRANT_TOTAL,
    payload: {
      total: total
    }
  }
}


export function getIntakeForms(bookingId){
  const request = axios.get(`${ROOT_URL}/booking/forms/:bookingId`);
  // const request = axios.get('http://demo1743653.mockable.io/forms');
  return dispatch => {
    dispatch(showLoading());
    return dispatch({
      type: GET_INTAKE_FORMS,
      payload: request
    })
    .then(() => {
      dispatch(hideLoading());
    });
  }
}

export function saveIntakeForm(formObj){
  return {
    type: SAVE_INTAKE_FORM,
    payload: {
      formObj: formObj
    }
  }
}

export function leaseBooking(props){
  // const request = axios.post(`${ROOT_URL}/booking/lease`, props);
  const request = axios.post('http://demo1743653.mockable.io/lease');

  return dispatch => {
    dispatch(showLoading());
    return dispatch({
      type: LEASE_BOOKING,
      payload: request
    })
    .then(() => {
      dispatch(hideLoading());
    });
  }
}

export function bookingIsPaid(flag){
  return {
    type: SET_PAYMENT_STATUS,
    payload: {
      isPaid: flag
    }
  }
}

export function bookAppointment(bookingId){
  // const request = axios.post(`${ROOT_URL}/booking/Confirm`, { bookingId });
  const request = axios.get('http://demo1743653.mockable.io/book');

  return dispatch => {
    dispatch(showLoading());
    return dispatch({
      type: BOOK_APPOINTMENT,
      payload: request
    })
    .then(() => {
      dispatch(hideLoading());
    });
  }
}


export function testThunk(){
  const request = axios.get('http://demo1743653.mockable.io/availability');
  console.log("here");
  return dispatch => {
    dispatch(showLoading());
    return dispatch({
      type: "TEST_THUNK",
      payload:request
    })
    .then(() => {
      dispatch(hideLoading());
    });
  }
}
