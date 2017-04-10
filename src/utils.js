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
            "time": startDate + " " + timeslot,
            "provider" : [provider.providerId]
          });
        });

        if (provider.availabilities[index].timeSlots.length > 0){
          provider.availabilities[index].startDate = startDate + " " + availabilities.timeSlots[0];
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