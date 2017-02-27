import { UPDATE_TAB } from '../actions/index';

const INITIAL_STATE = { currentTab : 2 };

export default function (state = INITIAL_STATE , action){
  switch(action.type){

    case UPDATE_TAB:
      return { 
        currentTab: action.payload.tabIndex
      };
    default:
    return state;

  }
}