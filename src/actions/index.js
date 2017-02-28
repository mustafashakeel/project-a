/* UI */
export const UPDATE_TAB  = 'UPDATE_TAB';
export const TOGGLE_TOOLTIP  = 'TOGGLE_TOOLTIP';
export const UPDATE_STEPS  = 'UPDATE_STEPS';

export function updateTab(indexTab){
  return {
    type: UPDATE_TAB,
    payload: {
      tabIndex: indexTab
    }
  };
}

export function toggleTooltip(data){
  return {
    type: TOGGLE_TOOLTIP,
    payload: {
      data: data
    }
  };
}

/* USERS */

export const UPDATE_USER_CREDENTIALS = 'UPDATE_USER_CREDENTIALS';
export const FETCH_USER = 'FETCH_USER';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';

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

export function getCurrentUser(){
  return {
    type: GET_CURRENT_USER,
    payload: {}
  }
}

/* BOOKING */

export const SET_BOOKING_TIME = 'SET_BOOKING_TIME';

export function setBookingTime(timestamp){
  return {
    type: SET_BOOKING_TIME,
    payload: {
      timestamp: timestamp
    }
  }
}