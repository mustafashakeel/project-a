// import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { fetchAvailabilities } from './business';

export const UPDATE_TAB  = 'UPDATE_TAB';
export const TOGGLE_TOOLTIP  = 'TOGGLE_TOOLTIP';
export const UPDATE_STEPS  = 'UPDATE_STEPS';
export const SHOW_LOGIN  = 'SHOW_LOGIN';
export const ADD_ERROR_MSG = 'ADD_ERROR_MSG';
export const SET_ERROR_MSGS = 'SET_ERROR_MSGS';
export const CHANGE_MONTH_CALENDAR = 'CHANGE_MONTH_CALENDAR';
export const SHOW_LOADER = 'SHOW_LOADER';

export function updateTab(indexTab){
  // console.log('TABINDEX:',indexTab);
  if (indexTab === 0) {
    window.location.reload();
  }
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

export function showLogin(flag){
  return  {
    type: SHOW_LOGIN,
    payload:{
      show: flag
    }
  };
}

export function toggleLoadingBar(flag){

  return dispatch => {
    if (flag){
      dispatch(showLoading());
    }else{
      dispatch(hideLoading());    }

  };
}

export function addErrorMsg(text, action){
  return {
    type: ADD_ERROR_MSG,
    payload: {
      text,
      action
    }
  };
}

export function setErrorMsgs(toasts){
  return {
    type: SET_ERROR_MSGS,
    payload: {
      toasts
    }
  };
}

export function changeMonthCalendar(operator, num){

  return (dispatch, getState) => {
    const {ui} = getState();
    let newMonth;
    if (operator === 'add'){
      newMonth = ui.calendarMonth.add(num, 'months');
    }else if (operator === 'subtract') {
      newMonth = ui.calendarMonth.subtract(num, 'months');
    }

    dispatch({
      type: CHANGE_MONTH_CALENDAR,
      payload: {
        newMonth
      }
    });

    dispatch(fetchAvailabilities());
  }
}

export function showLoading(){
  return {
    type: SHOW_LOADER,
    payload: true
  }
}
export function hideLoading(){
  return {
    type: SHOW_LOADER,
    payload: false
  }
}