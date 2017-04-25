import moment from 'moment';

import { 
  UPDATE_TAB, 
  TOGGLE_TOOLTIP, 
  SHOW_LOGIN, 
  ADD_ERROR_MSG, 
  SET_ERROR_MSGS,
  CHANGE_MONTH_CALENDAR,
  SHOW_LOADER
} from '../actions/index';

const INITIAL_STATE = { 
  currentTab : 0,
  toolTip: {
    shown: false,
    data: {}
  },
  showLogin: true,
  errorMsgs: {
    toasts: [],
    autohide:true
  },
  calendarMonth: moment().startOf('month'),
  loading: false
};

export default function (state = INITIAL_STATE , action){
  switch(action.type){

    case UPDATE_TAB:
      return { ...state, currentTab: action.payload.tabIndex};

    case TOGGLE_TOOLTIP:
      return { ...state, toolTip: action.payload.data};

    case SHOW_LOGIN:
      return { ...state, showLogin: action.payload.show};

    case ADD_ERROR_MSG:
      const toasts = state.errorMsgs.toasts.slice();
      toasts.push({ text:action.payload.text, action: action.payload.action });

      var errorMsgs = {...state.errorMsgs, toasts}

      return { ...state, errorMsgs };

    case SET_ERROR_MSGS:
      errorMsgs = {...state.errorMsgs, toasts: action.payload.toasts}
      return { ...state, errorMsgs };

    case CHANGE_MONTH_CALENDAR:
      return { ...state, calendarMonth: action.payload.newMonth }
    case SHOW_LOADER:
      return { ...state, loading: action.payload}

    default:
      return state;

  }
}