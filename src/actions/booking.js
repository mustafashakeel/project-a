export const SET_BOOKING_TIME = 'SET_BOOKING_TIME';
export const SET_BOOKING_STATUS = 'SET_BOOKING_STATUS';
export const SET_BOOKING_LOCATION = 'SET_BOOKING_LOCATION';
export const SET_BOOKING_SERVICE = 'SET_BOOKING_SERVICE';
export const SET_BOOKING_PROVIDER = 'SET_BOOKING_PROVIDER';
export const SET_BOOKING_DEPENDANT = 'SET_BOOKING_DEPENDANT';

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

export function setBookingDependant(dependant){
  return {
    type: SET_BOOKING_DEPENDANT,
    payload: {
      dependant: dependant
    }
  }
}