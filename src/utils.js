import validator from 'validator';
import deepmerge from 'deepmerge'
import moment from 'moment';

export function checkFields(fields){
  let valid = 0;
  let required = 0;
  let keysArray = Object.keys(fields);
  keysArray.forEach(function(key) {
    if(fields[key].required){
      const emptyField = validator.isEmpty(fields[key].value)
      fields[key].error = emptyField;
      valid = (!emptyField) ? valid + 1 : valid;
      required++;
    }
  });
  return {
    fields,
    valid: valid === required
  }
}

export function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

export function groupOfferingsByCat(services){
  var categoriesIndexed = [];
  var categories = [];
  var uncategorized = {
    id: 'uncategorized',
    cat_name: "Misc",
    children: []
  };

  services.forEach(function(service) {
    if (service.categories.length > 0 ) {
      service.categories.forEach(function(category) {
          if(!categoriesIndexed[category.id]) {
              categoriesIndexed[category.id] = {
                  id: category.id,
                  cat_name: category.name,
                  children: []
              };
              categories.push(categoriesIndexed[category.id]);
          }
          categoriesIndexed[category.id].children.push(service);
      });
    } else {
      uncategorized.children.push(service);
      // console.log(service);
    }
  });

  return categories.concat(uncategorized);
}

export function getProvidersFromAvailabilities(availabilities){

  if(typeof availabilities._days === undefined){
    return [];
  }

  var providersIndexed = [];
  var providers = [];

  availabilities._days.forEach(function(day) {
      day._schedules[0]._providers.forEach(function(provider) {
          if(!providersIndexed[provider.Id]) {
              provider.fullName = provider.User.FirstName + " " + provider.User.LastName;
              providersIndexed[provider.Id] = provider;

              providers.push(providersIndexed[provider.Id]);
          }
      });
  });

  return providers;
}


export function parseAvailabilities(availabilities, timezone){
  if (!availabilities || availabilities.length === 0 || availabilities === null){
    return [];
  }

  let availabilitiesArray = [];

  availabilities.forEach((provider) => {

    if (provider.availabilities !== null) {
      provider.availabilities.forEach((availabilities, index) => {
        const newTimeSlots = [];
        const startDate = availabilities.startDate;

        availabilities.timeSlots.forEach((timeslot) => {
          newTimeSlots.push({
            "time": startDate + " " + convertTo24Hour(timeslot.startTime),
            "allowConfirmedBookings": timeslot.allowConfirmedBookings,
            "providers" : [provider.providerId]
          });
        });

        if (provider.availabilities[index].timeSlots.length > 0){
          provider.availabilities[index].startDate = startDate + " " + convertTo24Hour(availabilities.timeSlots[0].startTime);
          provider.availabilities[index].timeSlots = newTimeSlots;
        }

      });

      availabilitiesArray.push(provider.availabilities);
    }
  });
  if (availabilitiesArray.length > 1) {
    return deepmerge.all(availabilitiesArray);
  }else if(availabilitiesArray.length){
    return availabilitiesArray[0];
  }else{
    return []
  }

}

export const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

export function convertTo24Hour(time) {
    var hours = parseInt(time.substr(0, 2));
    if(time.indexOf('AM') != -1 && hours == 12) {
        time = time.replace('12', '0');
    }
    if(time.indexOf('PM')  != -1 && hours < 12) {
        time = time.replace(hours, (hours + 12))
        if (time[0] == 0){
          time = time.substr(1,5);
        }
    }
    return time.replace(/( AM| PM)/, '');
}
