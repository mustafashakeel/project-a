import { UPDATE_TAB, TOGGLE_TOOLTIP } from '../actions/index';

const INITIAL_STATE = { 
  currentTab : 0,
  toolTip: {
    shown: false,
    data: {}
  }
};

export default function (state = INITIAL_STATE , action){
  switch(action.type){

    case UPDATE_TAB:
      return { 
        currentTab: action.payload.tabIndex
      };

    case TOGGLE_TOOLTIP:

    return { ...state, toolTip: action.payload.data};

    default:
    return state;

  }
}