export const UPDATE_USER_CREDENTIALS = 'UPDATE_USER_CREDENTIALS';
export const FETCH_USER = 'FETCH_USER';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const IS_LOGGED_IN  = 'IS_LOGGED_IN';


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

export function isLoggedIn(flag){
  
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