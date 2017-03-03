export const SET_BOOKING_TIME = 'SET_BOOKING_TIME';

export function setBookingTime(timestamp){
  return {
    type: SET_BOOKING_TIME,
    payload: {
      timestamp: timestamp
    }
  }
}