import { UPDATE_TAB, TOGGLE_TOOLTIP, SHOW_LOGIN } from '../actions/index';

const INITIAL_STATE = { 
  currentTab : 0,
  toolTip: {
    shown: false,
    data: {}
  },
  showLogin: true
};

export default function (state = INITIAL_STATE , action){
  switch(action.type){

    case UPDATE_TAB:
      return { ...state, currentTab: action.payload.tabIndex};

    case TOGGLE_TOOLTIP:
      return { ...state, toolTip: action.payload.data};

    case SHOW_LOGIN:
      return { ...state, showLogin: action.payload.show};
    default:
      return state;

  }
}