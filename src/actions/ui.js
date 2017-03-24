import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const UPDATE_TAB  = 'UPDATE_TAB';
export const TOGGLE_TOOLTIP  = 'TOGGLE_TOOLTIP';
export const UPDATE_STEPS  = 'UPDATE_STEPS';
export const SHOW_LOGIN  = 'SHOW_LOGIN';

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

export function showLogin(flag){
  return  {
    type: SHOW_LOGIN,
    payload:{
      show: flag
    }
  }
}

export function toggleLoadingBar(flag){

  return dispatch => {
    if (flag){
      dispatch(showLoading());
    }else{
      dispatch(hideLoading());    }

  }
}