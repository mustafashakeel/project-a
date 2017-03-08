export const SET_BOOKING_TIME = 'SET_BOOKING_TIME';
export const SET_BOOKING_STATUS = 'SET_BOOKING_STATUS'
export const SET_BOOKING_LOCATION = 'SET_BOOKING_LOCATION'
export const SET_BOOKING_SERVICE = 'SET_BOOKING_SERVICE'

export function setBookingTime(timestamp){
  return {
    type: SET_BOOKING_TIME,
    payload: {
      timestamp: timestamp
    }
  }
}

export function appointmentBooked(flag){
  return {
    type: SET_BOOKING_STATUS,
    payload: {
      booked: flag
    }
  }
}

export function setBookingLocation(locationObj){
  return {
    type: SET_BOOKING_LOCATION,
    payload: {
      location: locationObj
    }
  }
}

export function setBookingService(serviceObj){
  return {
    type: SET_BOOKING_SERVICE,
    payload: {
      service: serviceObj
    }
  }
}