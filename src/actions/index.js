export const UPDATE_TAB  = 'UPDATE_TAB';
export const UPDATE_STEPS  = 'UPDATE_STEPS';
export const UPDATE_USER_CREDENTIALS = 'UPDATE_USER_CREDENTIALS';
export const FETCH_USER = 'FETCH_USER';

/* UI */

export function updateTab(indexTab){
  return {
    type: UPDATE_TAB,
    payload: {
      tabIndex: indexTab
    }
  };
}

/* USERS */

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