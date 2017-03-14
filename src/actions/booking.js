export const SET_BOOKING_TIME = 'SET_BOOKING_TIME';
export const SET_BOOKING_STATUS = 'SET_BOOKING_STATUS';
export const SET_BOOKING_LOCATION = 'SET_BOOKING_LOCATION';
export const SET_BOOKING_SERVICE = 'SET_BOOKING_SERVICE';
export const SET_BOOKING_PROVIDER = 'SET_BOOKING_PROVIDER';
export const SET_BOOKING_DEPENDANT = 'SET_BOOKING_DEPENDANT';
export const SET_PAYMENT_DETAILS = 'SET_PAYMENT_DETAILS';
export const SET_REMINDER_OPTS = 'SET_REMINDER_OPTS';
export const SET_GRANT_TOTAL = 'SET_GRANT_TOTAL';

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

export function setBookingProvider(providerObj){
  return {
    type: SET_BOOKING_PROVIDER,
    payload: {
      provider: providerObj
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

export function setPaymentsDetails(result){
  return {
    type: SET_PAYMENT_DETAILS,
    payload: {
      token: result.token
    }
  }
}

export function setReminderOpts(key, val){
  return {
    type: SET_REMINDER_OPTS,
    payload: {
      key: key,
      val: val
    }
  }
}

export function setGrantTotal(total){
  return {
    type: SET_GRANT_TOTAL,
    payload: {
      total: total
    }
  }
}
